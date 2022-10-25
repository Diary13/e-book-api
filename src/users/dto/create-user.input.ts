import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
  @Field()
  tel: string;
  @Field()
  image?: string;
  @Field()
  isAdmin: boolean;
}
