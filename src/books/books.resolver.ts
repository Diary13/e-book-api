import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { BookType } from './dto/book.output';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { Body, HttpException, HttpStatus, Post, UploadedFile } from '@nestjs/common';
import { FileUpload } from 'src/types/fileUpload';
import { HttpResponse } from 'src/types/httpResponse';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) { }

  @Query(() => [BookType], { name: 'books' })
  async findAll() {
    return await this.booksService.findAll();
  }

  @Query(() => BookType, { name: 'book' })
  async findOneById(@Args('id', { type: () => String }) id: string) {
    return this.booksService.findOneById(id);
  }

  @Mutation(() => HttpResponse)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.booksService.remove(id);
  }
}