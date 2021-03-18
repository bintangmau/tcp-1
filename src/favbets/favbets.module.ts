import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Favbets, FavbetSchema } from 'src/favbets/schemas/favbets.schema';
import { FavbetController } from './favbets.controller';
import { FavbetService } from './favbets.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Favbets.name, schema: FavbetSchema}])],
    controllers: [FavbetController],
    providers: [
        FavbetService
    ],
    exports: [FavbetService]
})
export class FavbetsModule {}
