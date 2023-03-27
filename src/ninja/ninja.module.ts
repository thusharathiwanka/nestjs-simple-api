import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NinjaController } from './ninja.controller';
import { Ninja } from './entities/ninja.entity';
import { NinjaService } from './ninja.service';
import { Skill } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ninja, Skill])],
  controllers: [NinjaController],
  providers: [NinjaService],
})
export class NinjaModule {}
