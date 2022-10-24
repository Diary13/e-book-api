import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookSchema } from './entities/book.entity';
import { BookController } from './books.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: bookSchema }])
  ],
  providers: [BooksResolver, BooksService],
  controllers: [BookController]
})
export class BooksModule { }
