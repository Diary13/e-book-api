import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StarsService } from './stars.service';
import { Star } from './entities/star.entity';
import { CreateStarInput } from './dto/create-star.input';
import { UpdateStarInput } from './dto/update-star.input';

@Resolver(() => Star)
export class StarsResolver {
  constructor(private readonly starsService: StarsService) {}

  @Mutation(() => Star)
  createStar(@Args('createStarInput') createStarInput: CreateStarInput) {
    return this.starsService.create(createStarInput);
  }

  @Query(() => [Star], { name: 'stars' })
  findAll() {
    return this.starsService.findAll();
  }

  @Query(() => Star, { name: 'star' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.starsService.findOne(id);
  }

  @Mutation(() => Star)
  updateStar(@Args('updateStarInput') updateStarInput: UpdateStarInput) {
    return this.starsService.update(updateStarInput.id, updateStarInput);
  }

  @Mutation(() => Star)
  removeStar(@Args('id', { type: () => Int }) id: number) {
    return this.starsService.remove(id);
  }
}
