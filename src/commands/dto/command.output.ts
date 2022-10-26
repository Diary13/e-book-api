import { Field, ObjectType } from "@nestjs/graphql";
import { BookType } from "src/books/dto/book.output";
import { UserType } from "src/users/dto/user.output";

@ObjectType()
export class CommandType {
    @Field()
    id: string;
    @Field()
    quantity: number;
    @Field()
    createdAt: Date;
    @Field()
    deliverAt: Date;
    @Field()
    deliveryAddress: string;
    @Field()
    bookId: BookType;
    @Field()
    userId: UserType;
}