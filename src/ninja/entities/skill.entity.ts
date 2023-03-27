import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Ninja } from './ninja.entity';

@Entity('skills')
export class Skill {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToMany((type) => Ninja, (ninja) => ninja.skills)
  ninjas: Ninja[];
}
