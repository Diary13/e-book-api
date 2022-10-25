import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
  ],
  providers: [UsersResolver, UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
