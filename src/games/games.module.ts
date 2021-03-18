import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Settinggames, SettingSchema } from 'src/games/schemas/setting.schema'
import { GameController } from './games.controller';
import { GameService } from './games.service';
import { Transactions, TransactionSchema } from './schemas/transaction.schema';
import { settingProvider } from './settings.providers';
import { tableProvider } from './tables.providers';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Settinggames.name, schema: SettingSchema}]),
        MongooseModule.forFeature([{name: Transactions.name, schema: TransactionSchema}])
    ],
    controllers: [GameController],
    providers: [
        ...settingProvider,
        ...tableProvider,
        GameService
    ],
    exports: [GameService]
})
export class GamesModule {}
