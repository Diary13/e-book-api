import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class BookType {
    @Field(() => ID)
    // @IsNotEmpty()
    readonly id: string
    @Field()
    // @IsNotEmpty()
    readonly title: string;
    @Field()
    // @IsNotEmpty()
    readonly description: string;
    @Field()
    // @IsNotEmpty()
    readonly author: string;
    @Field()
    // @IsNotEmpty()
    readonly genre: string;
    @Field()
    readonly EditionDate: Date;
    @Field()
    // @IsNotEmpty()
    readonly price: number;
    @Field()
    // @IsNotEmpty()
    readonly image: string;
    @Field()
    // @IsNotEmpty()
    readonly quantity: string;
}