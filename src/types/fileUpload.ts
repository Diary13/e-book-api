import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Stream } from 'stream';

@ObjectType()
export class FileUpload {
    @Field()
    filename: string;
    @Field()
    mimetype: string;
    @Field()
    encoding: string;
    @Field()
    createReadStream: () => Stream;
}