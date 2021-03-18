import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transactions & Document;

@Schema()
export class Transactions {
    
    @Prop()
    commission: number;

    @Prop()
    status: string;

    @Prop({type: Object})
    betLose: number;

    @Prop()
    betWin: number;

    @Prop()
    userId: number;

    @Prop()
    tableKey: string;
    
    @Prop()
    round: number;

    @Prop()
    typeChoice: string;

    @Prop()
    choice: string;

    @Prop()
    bet: number;

    @Prop()
    game_type: string;

    @Prop()
    tableType: string;

    @Prop({type: Date, default: Date.now})
    createdAt: Date;

    @Prop({type: Date, default: Date.now})
    updatedAt: Date;

}

export const TransactionSchema = SchemaFactory.createForClass(Transactions);