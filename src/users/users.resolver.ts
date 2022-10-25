import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserType } from './dto/user.output';
import { HttpResponse } from 'src/types/httpResponse';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [UserType], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => HttpResponse)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
