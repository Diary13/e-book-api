import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StarsService } from './stars.service';
import { Star } from './entities/star.entity';
import { CreateStarInput } from './dto/create-star.input';
import { StarType } from './dto/star.output';
import { HttpResponse } from 'src/types/httpResponse';

@Resolver(() => Star)
export class StarsResolver {

  constructor(private readonly starsService: StarsService) { }

  @Mutation(() => HttpResponse)
  createStar(@Args('createStarInput') createStarInput: CreateStarInput) {
    console.log("bebe");

    return this.starsService.create(createStarInput);
  }

  @Query(() => [StarType], { name: 'stars' })
  findAll(@Args('bookId', { type: () => String }) bookId: string) {
    return this.starsService.findAll(bookId);
  }
}
