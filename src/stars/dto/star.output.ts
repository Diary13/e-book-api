import { Field, ObjectType } from "@nestjs/graphql";
import { BookType } from "src/books/dto/book.output";
import { UserType } from "src/users/dto/user.output";

@ObjectType()
export class StarType {
    @Field()
    notice: number
    @Field()
    bookId: BookType;
    @Field()
    userId: UserType
}