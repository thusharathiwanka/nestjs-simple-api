import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Skill } from './skill.entity';

@Entity('ninjas')
export class Ninja {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  weapon: string;

  @ApiProperty()
  @Column()
  stealth: number;

  @ApiProperty()
  @Column()
  agility: number;

  @ApiProperty()
  @ManyToMany((type) => Skill, (skill) => skill.ninjas, { cascade: true })
  skills: string[];
}
