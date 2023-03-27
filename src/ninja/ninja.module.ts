import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NinjaController } from './ninja.controller';
import { Ninja } from './entities/ninja.entity';
import { NinjaService } from './ninja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ninja])],
  controllers: [NinjaController],
  providers: [NinjaService],
})
export class NinjaModule {}
