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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NinjaCreateDto } from './dto/ninja-create.dto';
import { NinjaUpdateDto } from './dto/ninja-update.dto';
import { NinjaEntity } from './entities/ninja.entity';
import { NinjaService } from './ninja.service';

@ApiTags('ninjas')
@Controller('ninjas')
export class NinjaController {
  constructor(private readonly ninjaService: NinjaService) {}

  // GET -> ninjas?weapon=weapon
  @ApiOkResponse({ type: NinjaEntity, isArray: true })
  @Get()
  getNinjasByWeapon(@Query('weapon') weapon: string): NinjaEntity[] {
    return this.ninjaService.getNinjasByWeapon(weapon);
  }

  // GET -> ninjas
  @ApiOkResponse({ type: NinjaEntity, isArray: true })
  @Get()
  getNinjas(): NinjaEntity[] {
    return this.ninjaService.getNinjas();
  }

  // GET -> ninjas/:id
  @ApiOkResponse({ type: NinjaEntity })
  @ApiNotFoundResponse()
  @Get(':id')
  getNinjaById(@Param('id') id: string): NinjaEntity {
    try {
      return this.ninjaService.getNinjaById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // POST -> ninjas
  @ApiCreatedResponse({ type: NinjaEntity })
  @Post()
  createNinja(@Body() ninja: NinjaCreateDto): NinjaEntity {
    return this.ninjaService.createNinja(ninja);
  }

  // PUT -> ninjas/:id
  @ApiOkResponse({ type: NinjaEntity })
  @Put(':id')
  updateNinja(
    @Param('id') id: string,
    @Body() ninja: NinjaUpdateDto,
  ): NinjaEntity {
    return this.ninjaService.updateNinja(id, ninja);
  }

  // DELETE -> ninjas/:id
  @Delete(':id')
  @ApiOkResponse({ type: NinjaEntity })
  deleteNinja(@Param('id') id: string): NinjaEntity {
    return this.ninjaService.deleteNinja(id);
  }
}
