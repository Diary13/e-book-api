import { Module } from '@nestjs/common';
import { StarsService } from './stars.service';
import { StarsResolver } from './stars.resolver';

@Module({
  providers: [StarsResolver, StarsService]
})
export class StarsModule {}
