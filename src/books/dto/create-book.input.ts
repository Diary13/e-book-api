import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty()
  title: string;
  @Field()
  @IsNotEmpty()
  description: string;
  @Field()
  @IsNotEmpty()
  author: string;
  @Field()
  @IsNotEmpty()
  genre: string;
  @Field({ defaultValue: Date.now() })
  EditionDate: Date;
  @Field()
  @IsNotEmpty()
  price: number;
  @Field()
  image?: string;
  @Field()
  @IsNotEmpty()
  quantity: string;
}
