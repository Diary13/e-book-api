import { Module } from '@nestjs/common';
import { StarsService } from './stars.service';
import { StarsResolver } from './stars.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Star, starSchema } from './entities/star.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Star.name, schema: starSchema }])
  ],
  providers: [StarsResolver, StarsService],
  exports: [StarsService],
})
export class StarsModule { }
