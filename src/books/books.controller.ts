import { Body, Controller, HttpException, HttpStatus, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book, bookDocument } from './entities/book.entity';

@Controller('book')
export class BookController {

    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<bookDocument>,
        private readonly booksService: BooksService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
    async createBook(@UploadedFile() image, @Body() createBookInput: CreateBookInput) {
        try {
            const data = { path: 'uploads/' + Date.now() + '_' + image.originalname };
            fs.renameSync('uploads/' + image.filename, data.path)
            const result = await this.booksService.create({ ...createBookInput, image: data.path });
            if (result.statusCode == HttpStatus.UNAUTHORIZED)
                fs.unlinkSync(data.path);
            return result;
        } catch (error) {
            throw new HttpException('Could not save books', HttpStatus.UNAUTHORIZED);
        }
    }

    @Put('update')
    @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
    async updateBook(@UploadedFile() image, @Body() updateBookInput: UpdateBookInput) {
        try {
            const foundBook = await this.bookModel.findById(updateBookInput.id);
            if (foundBook) {
                if (image) {
                    fs.unlinkSync(foundBook.image);
                    const data = { path: 'uploads/' + Date.now() + '_' + image.originalname }
                    fs.renameSync('uploads/' + image.filename, data.path);
                    updateBookInput.image = data.path;
                    return await this.booksService.update(updateBookInput);
                }
                return await this.booksService.update(updateBookInput);
            }
        } catch (error) {
            throw new HttpException('cannot update book', HttpStatus.UNAUTHORIZED);
        }
    }
}