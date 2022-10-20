import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStarInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
