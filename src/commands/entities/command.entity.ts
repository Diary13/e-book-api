import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type commandDocument = Document & Command;

@Schema()
export class Command {
  @Prop()
  quantity: number;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: Date.now() })
  deliverAt: Date;
  @Prop()
  deliveryAddress: string;
  @Prop({ type: Types.ObjectId, ref: 'Book' })
  bookId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const commandSchema = SchemaFactory.createForClass(Command);