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
  getNinjasByWeapon(@Query('weapon') weapon: string): Ninja[] {
    return this.ninjaService.getNinjasByWeapon(weapon);
  }

  // GET -> ninjas
  @ApiOkResponse({ type: Ninja, isArray: true })
  @Get()
  getNinjas(): Ninja[] {
    return this.ninjaService.getNinjas();
  }

  // GET -> ninjas/:id
  @ApiOkResponse({ type: Ninja })
  @ApiNotFoundResponse()
  @Get(':id')
  getNinjaById(@Param('id') id: string): Ninja {
    try {
      return this.ninjaService.getNinjaById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // POST -> ninjas
  @ApiCreatedResponse({ type: Ninja })
  @ApiBadRequestResponse()
  @Post()
  createNinja(@Body() ninja: NinjaCreateDto): Ninja {
    return this.ninjaService.createNinja(ninja);
  }

  // PUT -> ninjas/:id
  @ApiOkResponse({ type: Ninja })
  @ApiBadRequestResponse()
  @Patch(':id')
  updateNinja(@Param('id') id: string, @Body() ninja: NinjaUpdateDto): Ninja {
    return this.ninjaService.updateNinja(id, ninja);
  }

  // DELETE -> ninjas/:id
  @Delete(':id')
  @ApiOkResponse({ type: Ninja })
  deleteNinja(@Param('id') id: string): Ninja {
    return this.ninjaService.deleteNinja(id);
  }
}
