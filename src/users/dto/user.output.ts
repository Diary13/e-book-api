import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
    @Field()
    id: string
    @Field()
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