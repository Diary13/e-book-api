import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from 'src/types/httpResponse';
import { CreateStarInput } from './dto/create-star.input';
import { Star, starDocument } from './entities/star.entity';

@Injectable()
export class StarsService {

  constructor(
    @InjectModel(Star.name) private readonly starModel: Model<starDocument>
  ) { }

  async create(createStarInput: CreateStarInput): Promise<HttpResponse> {
    try {
      const newStar = new this.starModel(createStarInput).save();
      console.log(newStar);
      if (newStar)
        return {
          statusCode: HttpStatus.OK,
          message: 'stars created successfully'
        }
      return {
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: "Cannot create stars"
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(bookId: string): Promise<Star[]> {
    try {
      return await this.starModel.find({ bookId: bookId }).populate('userId bookId');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
