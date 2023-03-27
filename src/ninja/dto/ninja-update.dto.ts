import { PartialType } from '@nestjs/mapped-types';

import { NinjaCreateDto } from './ninja-create.dto';

export class NinjaUpdateDto extends PartialType(NinjaCreateDto) {}
