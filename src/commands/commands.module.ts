import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsResolver } from './commands.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Command, commandSchema } from './entities/command.entity';
import { Book, bookSchema } from 'src/books/entities/book.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Command.name, schema: commandSchema },
      { name: Book.name, schema: bookSchema }
    ])
  ],
  providers: [CommandsResolver, CommandsService]
})
export class CommandsModule { }
