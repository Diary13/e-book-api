import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStarInput {
  @Field()
  notice: number
  @Field()
  bookId: string;
  @Field()
  userId: string
}
