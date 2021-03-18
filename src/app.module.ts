import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GamesModule } from './games/games.module';
import { DatabaseModule } from 'src/core/database/database.module';
import { MongooseModule } from '@nestjs/mongoose'
import { FavbetsModule } from './favbets/favbets.module';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GamesModule,
    DatabaseModule, 
    MongooseModule.forRoot(`mongodb://${process.env.MDB_HOST}:${process.env.MDB_PORT}`, {
      user: process.env.MDB_USER,
      pass: process.env.MDB_PASS,
      dbName: process.env.MDB_NAME_DEVELOPMENT,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }), FavbetsModule
  ],
})
export class AppModule {}
