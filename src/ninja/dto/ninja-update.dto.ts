import { ApiPropertyOptional } from '@nestjs/swagger';

export class NinjaUpdateDto {
  @ApiPropertyOptional()
  id?: string;
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  weapon?: string;
  @ApiPropertyOptional()
  stealth?: number;
  @ApiPropertyOptional()
  agility?: number;
}
