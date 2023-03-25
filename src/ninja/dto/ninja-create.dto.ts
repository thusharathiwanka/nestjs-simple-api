import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNumber, MaxLength } from 'class-validator';

export class NinjaCreateDto {
  @ApiProperty()
  @IsAlpha()
  @MaxLength(100)
  name: string;
  @ApiProperty()
  @IsAlpha()
  @MaxLength(50)
  weapon: string;
  @ApiProperty()
  @IsNumber()
  stealth: number;
  @ApiProperty()
  @IsNumber()
  agility: number;
}
