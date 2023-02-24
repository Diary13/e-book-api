import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { HttpResponse } from 'src/types/httpResponse';
import { BookType } from './dto/book.output';
import { UpdateBookInput } from './dto/update-book.input';
import { Book, bookDocument } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(@InjectModel(Book.name) private bookModel: Model<bookDocument>) { }

  async create(createBookInput: Omit<BookType, 'id'>): Promise<any> {// or InputType
    try {
      const findBook = await this.bookModel.findOne({ title: createBookInput.title });
      if (!findBook) {
        const newBook = await new this.bookModel(createBookInput).save();
        const result = JSON.parse(JSON.stringify(newBook));
        return { ...result, statusCode: HttpStatus.OK };
      }
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "book already exist"
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(updateBookInput: UpdateBookInput): Promise<Book> {
    try {
      const updateBook = this.bookModel.findOneAndUpdate({ _id: updateBookInput.id }, {
        title: updateBookInput.title,
        description: updateBookInput.description,
        author: updateBookInput.author,
        genre: updateBookInput.genre,
        EditionDate: updateBookInput.EditionDate,
        price: updateBookInput.price,
        image: updateBookInput.image,
        quantity: updateBookInput.quantity
      }, {
        new: true //return updated element
      });
      return updateBook;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      return this.bookModel.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneById(id: string): Promise<Book> {
    try {
      return await this.bookModel.findById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<HttpResponse> {
    try {
      const foundBook = await this.bookModel.findById(id);
      if (foundBook) {
        fs.unlinkSync(foundBook.image);
        const deleted = await this.bookModel.deleteOne({ _id: id });
        if (deleted)
          return {
            statusCode: HttpStatus.OK,
            message: "book deleted successfully"
          }
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }
}