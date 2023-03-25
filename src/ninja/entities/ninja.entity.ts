import { ApiProperty } from '@nestjs/swagger';

export class NinjaEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  weapon: string;
  @ApiProperty()
  stealth: number;
  @ApiProperty()
  agility: number;
}
