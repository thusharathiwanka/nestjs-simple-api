import { ApiProperty } from '@nestjs/swagger';

export class NinjaCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  weapon: string;
  @ApiProperty()
  stealth: number;
  @ApiProperty()
  agility: number;
}
