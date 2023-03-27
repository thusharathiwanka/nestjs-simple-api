import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NinjaCreateDto } from './dto/ninja-create.dto';
import { NinjaUpdateDto } from './dto/ninja-update.dto';
import { Ninja } from './entities/ninja.entity';
import { NinjaService } from './ninja.service';

@ApiTags('ninjas')
@Controller('ninjas')
export class NinjaController {
  constructor(private readonly ninjaService: NinjaService) {}

  // GET -> ninjas?weapon=weapon
  @ApiOkResponse({ type: Ninja, isArray: true })
  @Get()
  getNinjasByWeapon(@Query('weapon') weapon: string) {
    return this.ninjaService.getNinjasByWeapon(weapon);
  }

  // GET -> ninjas
  @ApiOkResponse({ type: Ninja, isArray: true })
  @Get()
  getNinjas() {
    return this.ninjaService.getNinjas();
  }

  // GET -> ninjas/:id
  @ApiOkResponse({ type: Ninja })
  @ApiNotFoundResponse()
  @Get(':id')
  getNinjaById(@Param('id') id: string) {
    try {
      return this.ninjaService.getNinjaById(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // POST -> ninjas
  @ApiCreatedResponse({ type: Ninja })
  @ApiBadRequestResponse()
  @Post()
  createNinja(@Body() ninja: NinjaCreateDto) {
    return this.ninjaService.createNinja(ninja);
  }

  // PUT -> ninjas/:id
  @ApiOkResponse({ type: Ninja })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Patch(':id')
  updateNinja(@Param('id') id: string, @Body() ninja: NinjaUpdateDto) {
    return this.ninjaService.updateNinja(id, ninja);
  }

  // DELETE -> ninjas/:id
  @Delete(':id')
  @ApiOkResponse({ type: Ninja })
  @ApiNotFoundResponse()
  deleteNinja(@Param('id') id: string) {
    return this.ninjaService.deleteNinja(+id);
  }
}
