import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Settinggames & Document;


@Schema()
export class Settinggames {

  @Prop()
  games_id: number;

  @Prop()
  user: number;

  @Prop({type: Object})
  rules: object;

  @Prop()
  commission: number;

  @Prop()
  isVerified: boolean;

  @Prop()
  name: string;

  @Prop({type: Date, default: Date.now})
  createdAt: string

  @Prop({type: Date, default: Date.now})
  updatedAt: string

}

export const SettingSchema = SchemaFactory.createForClass(Settinggames);