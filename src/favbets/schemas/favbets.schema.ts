import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavbetDocument = Favbets & Document;


@Schema()
export class Favbets {

  @Prop()
  player_id: number;

  @Prop()
  table_key: string;

  @Prop({ type: [Object] })
  list_favourite: [{index: Number, pattern: Array<String>}];

  @Prop({type: Date, default: Date.now})
  createdAt: string

  @Prop({type: Date, default: Date.now})
  updatedAt: string

}

export const FavbetSchema = SchemaFactory.createForClass(Favbets);