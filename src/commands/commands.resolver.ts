import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandsService } from './commands.service';
import { Command } from './entities/command.entity';
import { CreateCommandInput } from './dto/create-command.input';
import { UpdateCommandInput } from './dto/update-command.input';

@Resolver(() => Command)
export class CommandsResolver {
  constructor(private readonly commandsService: CommandsService) { }

  // @Mutation(() => Command)
  // createCommand(@Args('createCommandInput') createCommandInput: CreateCommandInput) {
  //   return this.commandsService.create(createCommandInput);
  // }

  // @Query(() => [Command], { name: 'commands' })
  // findAll() {
  //   return this.commandsService.findAll();
  // }

  // @Query(() => Command, { name: 'command' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.commandsService.findOne(id);
  // }

  // @Mutation(() => Command)
  // updateCommand(@Args('updateCommandInput') updateCommandInput: UpdateCommandInput) {
  //   return this.commandsService.update(updateCommandInput.id, updateCommandInput);
  // }

  // @Mutation(() => Command)
  // removeCommand(@Args('id', { type: () => Int }) id: number) {
  //   return this.commandsService.remove(id);
  // }
}
