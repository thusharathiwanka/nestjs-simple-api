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
import { NinjaService } from './ninja.service';

@Controller('ninjas')
export class NinjaController {
  constructor(private readonly ninjaService: NinjaService) {}

  // GET -> ninjas?weapon=weapon
  @Get()
  getNinjasByWeapon(@Query('weapon') weapon: string): Ninja[] {
    return this.ninjaService.getNinjasByWeapon(weapon);
  }

  // GET -> ninjas
  @Get()
  getNinjas(): Ninja[] {
    return this.ninjaService.getNinjas();
  }

  // GET -> ninjas/:id
  @Get(':id')
  getNinjaById(@Param('id') id: string): Ninja {
    try {
      return this.ninjaService.getNinjaById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // POST -> ninjas
  @Post()
  createNinja(@Body() ninja: Ninja) {
    return this.ninjaService.createNinja(ninja);
  }

  // PUT -> ninjas/:id
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() ninja: Ninja) {
    return this.ninjaService.updateNinja(id, ninja);
  }

  // DELETE -> ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjaService.deleteNinja(id);
  }
}
