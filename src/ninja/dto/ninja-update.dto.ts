import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlpha, IsNumber, IsNumberString, MaxLength } from 'class-validator';

export class NinjaUpdateDto {
  @ApiPropertyOptional()
  @IsNumberString()
  id?: string;
  @ApiPropertyOptional()
  @IsAlpha()
  @MaxLength(100)
  name?: string;
  @ApiPropertyOptional()
  @IsAlpha()
  @MaxLength(50)
  weapon?: string;
  @ApiPropertyOptional()
  @IsNumber()
  stealth?: number;
  @ApiPropertyOptional()
  @IsNumber()
  agility?: number;
}
