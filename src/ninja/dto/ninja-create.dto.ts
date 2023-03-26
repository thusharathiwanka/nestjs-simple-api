import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class NinjaCreateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  readonly name: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  readonly weapon: string;
  @ApiProperty()
  @IsNumber()
  readonly stealth: number;
  @ApiProperty()
  @IsNumber()
  readonly agility: number;
}
