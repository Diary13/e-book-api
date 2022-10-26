import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, bookDocument } from 'src/books/entities/book.entity';
import { HttpResponse } from 'src/types/httpResponse';
import { CreateCommandInput } from './dto/create-command.input';
import { UpdateCommandInput } from './dto/update-command.input';
import { Command, commandDocument } from './entities/command.entity';

@Injectable()
export class CommandsService {

  constructor(
    @InjectModel(Command.name) private readonly commandModel: Model<commandDocument>,
    @InjectModel(Book.name) private readonly bookModel: Model<bookDocument>
  ) { }

  async create(createCommandInput: CreateCommandInput): Promise<HttpResponse> {
    try {
      createCommandInput.createdAt = new Date(Date.now());
      createCommandInput.deliverAt = new Date(Date.now() + 5);
      const getBook = await this.bookModel.findById(createCommandInput.bookId);
      if (getBook) {
        if (getBook.quantity >= createCommandInput.quantity) {
          await this.bookModel.findOneAndUpdate({ _id: createCommandInput.bookId }, {
            quantity: getBook.quantity - createCommandInput.quantity
          });
          const newCommand = new this.commandModel(createCommandInput).save();
          if (newCommand)
            return {
              statusCode: HttpStatus.OK,
              message: 'command created successfully'
            }
        }
        return {
          statusCode: HttpStatus.NOT_ACCEPTABLE,
          message: "Book quantity is not enough"
        }
      }

    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Command[]> {
    try {
      return await this.commandModel.find().populate("bookId userId");
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<Command> {
    try {
      return await this.commandModel.findById(id).populate("bookId userId");
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(updateCommandInput: UpdateCommandInput): Promise<Command> {
    try {
      const foundCommand = await this.commandModel.findById(updateCommandInput.id);
      if (foundCommand) {
        const foundBook = await this.bookModel.findById(foundCommand.bookId);
        if (foundBook) {
          await foundBook.updateOne({//return object { acknowledged: true,...}
            quantity: foundBook.quantity + (foundCommand.quantity - updateCommandInput.quantity)
          });
          return await this.commandModel.findByIdAndUpdate({ _id: updateCommandInput.id }, {
            quantity: updateCommandInput.quantity,
            deliveryAddress: updateCommandInput.deliveryAddress,
            bookId: updateCommandInput.bookId,
            userId: updateCommandInput.userId,
            createdAt: updateCommandInput.createdAt,
            deliverAt: updateCommandInput.deliverAt
          }, { new: true }).populate('bookId userId');//return Command updated
        }
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async cancelCommand(id: string) {
    try {
      const foundCommand = await this.commandModel.findById(id);
      if (foundCommand) {
        const deleted = await this.commandModel.findByIdAndRemove(id);
        if (deleted) {
          const foundBook = await this.bookModel.findById(foundCommand.bookId);
          if (foundBook) {
            await foundBook.updateOne({
              quantity: foundBook.quantity + foundCommand.quantity
            });
            return {
              statusCode: HttpStatus.OK,
              message: "Command canceled successfully"
            }
          }
          return {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Book not found"
          }
        }
      }
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "Command not found"
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<HttpResponse> {
    try {
      const deleted = await this.commandModel.findByIdAndDelete(id);
      console.log("deleted delete: ", deleted);
      if (deleted) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Command deleted successfully'
        };
      }
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Command not found'
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
