import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class NinjaUpdateDto {
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  readonly name?: string;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(50)
  readonly weapon?: string;
  @ApiPropertyOptional()
  @IsNumber()
  readonly stealth?: number;
  @ApiPropertyOptional()
  @IsNumber()
  readonly agility?: number;
}
