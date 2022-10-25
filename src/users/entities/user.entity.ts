import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type userDocument = Document & User;

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  tel: string;
  @Prop()
  image: string;
  @Prop({ default: false })
  isAdmin: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
