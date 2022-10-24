import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class HttpResponse {
    @Field()
    statusCode: number;
    @Field()
    message: string;
}