import { Module } from '@nestjs/common';

import { NinjaController } from './ninja.controller';
import { NinjaService } from './ninja.service';

@Module({
  imports: [],
  controllers: [NinjaController],
  providers: [NinjaService],
})
export class NinjaModule {}
