import * as dotenv from 'dotenv';
import { IMongooseConfig } from './interfaces/mongoose.interface';

dotenv.config();
console.log(`mongodb://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_HOST}:${process.env.MDB_PORT}/${process.env.MDB_NAME_DEVELOPMENT}`)
export const mongooseConfig: IMongooseConfig = {
  development: {
    uri: `mongodb://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_HOST}:${process.env.MDB_PORT}/${process.env.MDB_NAME_DEVELOPMENT}`,
    // uri: `mongodb://${process.env.MDB_HOST}:${process.env.MDB_PORT}`,
    options: {
      // user: process.env.MDB_USER,
      // pass: process.env.MDB_PASS,
      // dbName: process.env.MDB_NAME_DEVELOPMENT,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: process.env.MDB_USER,
      readPreference: "primary",
      appname: "MongoDB%20Compass",
      ssl: false
    }
  },
  test: {
    uri: `mongodb://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_HOST}:${process.env.MDB_PORT}/${process.env.MDB_NAME_TEST}`,
    options: {
      // user: process.env.MDB_USER,
      // pass: process.env.MDB_PASS,
      // dbName: process.env.MDB_NAME_TEST,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: process.env.MDB_USER,
      readPreference: "primary",
      appname: "MongoDB%20Compass",
      ssl: false
    }
  },
  production: {
    uri: `mongodb://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_HOST}:${process.env.MDB_PORT}/${process.env.MDB_NAME_PRODUCTION}`,
    options: {
      // user: process.env.MDB_USER,
      // pass: process.env.MDB_PASS,
      // dbName: process.env.MDB_NAME_PRODUCTION,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: process.env.MDB_USER,
      readPreference: "primary",
      appname: "MongoDB%20Compass",
      ssl: false
    }
  }
}