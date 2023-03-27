import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ninja } from './entities/ninja.entity';
import { NinjaCreateDto } from './dto/ninja-create.dto';
import { NinjaUpdateDto } from './dto/ninja-update.dto';

@Injectable()
export class NinjaService {
  constructor(
    @InjectRepository(Ninja)
    private readonly ninjaRepository: Repository<Ninja>,
  ) {}

  getNinjas(): Promise<Ninja[]> {
    return this.ninjaRepository.find();
  }

  async getNinjasByWeapon(weapon: string): Promise<Ninja[]> {
    if (weapon) return this.ninjaRepository.findBy({ weapon: weapon });
    return this.getNinjas();
  }

  async getNinjaById(id: number) {
    const ninja = await this.ninjaRepository.findOne({ where: { id: id } });

    if (!ninja) throw new NotFoundException(`Ninja not found with id of ${id}`);

    return ninja;
  }

  createNinja(ninjaCreateDto: NinjaCreateDto): Promise<Ninja> {
    const newNinja = this.ninjaRepository.create(ninjaCreateDto);
    return this.ninjaRepository.save(newNinja);
  }

  async updateNinja(
    id: string,
    ninjaUpdateDto: NinjaUpdateDto,
  ): Promise<Ninja> {
    const ninja = await this.ninjaRepository.preload({
      id: +id,
      ...ninjaUpdateDto,
    });

    if (!ninja) throw new NotFoundException(`Ninja not found with id of ${id}`);

    return this.ninjaRepository.save(ninja);
  }

  async deleteNinja(id: number): Promise<Ninja> {
    const ninja = await this.getNinjaById(id);

    return this.ninjaRepository.remove(ninja);
  }
}
