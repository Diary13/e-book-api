import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsResolver } from './commands.resolver';

@Module({
  providers: [CommandsResolver, CommandsService]
})
export class CommandsModule {}
