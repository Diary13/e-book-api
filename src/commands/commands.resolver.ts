import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandsService } from './commands.service';
import { Command } from './entities/command.entity';
import { CreateCommandInput } from './dto/create-command.input';
import { UpdateCommandInput } from './dto/update-command.input';
import { HttpResponse } from 'src/types/httpResponse';
import { CommandType } from './dto/command.output';

@Resolver(() => Command)
export class CommandsResolver {
  constructor(private readonly commandsService: CommandsService) { }

  @Mutation(() => HttpResponse)
  createCommand(@Args('createCommandInput') createCommandInput: CreateCommandInput) {
    return this.commandsService.create(createCommandInput);
  }

  @Query(() => [CommandType], { name: 'commands' })
  findAll() {
    return this.commandsService.findAll();
  }

  @Query(() => CommandType, { name: 'command' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commandsService.findOne(id);
  }

  @Mutation(() => CommandType)
  updateCommand(@Args('updateCommandInput') updateCommandInput: UpdateCommandInput) {
    return this.commandsService.update(updateCommandInput);
  }

  @Mutation(() => HttpResponse)
  cancelCommand(@Args('id', { type: () => String }) id: string) {
    return this.commandsService.cancelCommand(id);
  }

  @Mutation(() => HttpResponse)
  removeCommand(@Args('id', { type: () => String }) id: string) {
    return this.commandsService.remove(id);
  }
}
