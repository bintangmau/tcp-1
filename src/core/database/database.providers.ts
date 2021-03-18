import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { sequelizeInstance } from "src/config/instanceDb.config";
import { databaseConfig } from "./database.config";
import * as mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import { mongooseConfig } from "./mongoose.config";

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config: SequelizeOptions;
      switch (process.env.NODE_ENV) {
        case 'development':
          config = databaseConfig.development;
          break;
        case 'test':
          config = databaseConfig.test;
          break;
        case 'production':
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
          break;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([...sequelizeInstance]);
      await sequelize.sync();
      return sequelize;
    }
  },
  {
    provide: 'MONGOOSE',
    useFactory: async () => {
      let config: ConnectOptions;
      let uri: string;
      switch (process.env.NODE_ENV) {
        case 'development':
          uri = mongooseConfig.development.uri;
          config = mongooseConfig.development.options;
          break;
        case 'test':
          uri = mongooseConfig.test.uri;
          config = mongooseConfig.test.options;
          break;
        case 'production':
          uri = mongooseConfig.production.uri;
          config = mongooseConfig.production.options;
          break;
        default:
          uri = mongooseConfig.development.uri;
          config = mongooseConfig.development.options;
          break;
      }
      return mongoose.connect(uri, config);
    }
  },
]
