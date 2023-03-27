import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column('json', { nullable: true })
  skills: string[];
}
