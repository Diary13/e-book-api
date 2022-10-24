import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsResolver } from './commands.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Command, commandSchema } from './entities/command.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Command.name, schema: commandSchema }])
  ],
  providers: [CommandsResolver, CommandsService]
})
export class CommandsModule { }
