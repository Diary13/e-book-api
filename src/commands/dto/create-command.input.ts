import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommandInput {
  @Field()
  quantity: number;
  @Field(() => Date, { nullable: true })
  createdAt?: Date;
  @Field(() => Date, { nullable: true })
  deliverAt?: Date;
  @Field()
  deliveryAddress: string;
  @Field()
  bookId: string;
  @Field()
  userId: string;
}
