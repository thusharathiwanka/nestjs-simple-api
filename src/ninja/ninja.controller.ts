import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NinjaCreateDto } from './dto/ninja-create.dto';
import { NinjaUpdateDto } from './dto/ninja-update.dto';
import { NinjaEntity } from './entities/ninja.entity';
import { NinjaService } from './ninja.service';

@Controller('ninjas')
export class NinjaController {
  constructor(private readonly ninjaService: NinjaService) {}

  // GET -> ninjas?weapon=weapon
  @Get()
  getNinjasByWeapon(@Query('weapon') weapon: string): NinjaEntity[] {
    return this.ninjaService.getNinjasByWeapon(weapon);
  }

  // GET -> ninjas
  @Get()
  getNinjas(): NinjaEntity[] {
    return this.ninjaService.getNinjas();
  }

  // GET -> ninjas/:id
  @Get(':id')
  getNinjaById(@Param('id') id: string): NinjaEntity {
    try {
      return this.ninjaService.getNinjaById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // POST -> ninjas
  @Post()
  createNinja(@Body() ninja: NinjaCreateDto) {
    return this.ninjaService.createNinja(ninja);
  }

  // PUT -> ninjas/:id
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() ninja: NinjaUpdateDto) {
    return this.ninjaService.updateNinja(id, ninja);
  }

  // DELETE -> ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjaService.deleteNinja(id);
  }
}
