import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type starDocument = Document & Star;

@Schema()
export class Star {
  @Prop()
  notice: number
  @Prop({ type: Types.ObjectId, ref: 'Book' })
  bookId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId
}

export const startSchema = SchemaFactory.createForClass(Star);
