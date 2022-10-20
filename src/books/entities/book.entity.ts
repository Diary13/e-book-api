import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type bookDocument = Document & Book;

@Schema()
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  EditionDate: Date;
  @Prop()
  price: number;
  @Prop()
  image: string;
  @Prop()
  quantity: string;
}

export const bookShema = SchemaFactory.createForClass(Book);