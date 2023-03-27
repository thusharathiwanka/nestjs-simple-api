import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ninja } from './entities/ninja.entity';
import { NinjaCreateDto } from './dto/ninja-create.dto';
import { NinjaUpdateDto } from './dto/ninja-update.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class NinjaService {
  constructor(
    @InjectRepository(Ninja)
    private readonly ninjaRepository: Repository<Ninja>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  getNinjas(): Promise<Ninja[]> {
    return this.ninjaRepository.find({ relations: ['skills'] });
  }

  async getNinjasByWeapon(weapon: string): Promise<Ninja[]> {
    if (weapon) return this.ninjaRepository.findBy({ weapon: weapon });
    return this.getNinjas();
  }

  async getNinjaById(id: number) {
    const ninja = await this.ninjaRepository.findOne({
      where: { id: id },
      relations: ['skills'],
    });

    if (!ninja) throw new NotFoundException(`Ninja not found with id of ${id}`);

    return ninja;
  }

  async createNinja(ninjaCreateDto: NinjaCreateDto) {
    const skills = await Promise.all(
      ninjaCreateDto.skills.map((skill) => this.preloadSkillByName(skill.name)),
    );
    const newNinja = this.ninjaRepository.create({ ...ninjaCreateDto, skills });
    return this.ninjaRepository.save(newNinja);
  }

  async updateNinja(
    id: number,
    ninjaUpdateDto: NinjaUpdateDto,
  ): Promise<Ninja> {
    const skills =
      ninjaUpdateDto.skills &&
      (await Promise.all(
        ninjaUpdateDto.skills.map((skill) =>
          this.preloadSkillByName(skill.name),
        ),
      ));
    const ninja = await this.ninjaRepository.preload({
      id: id,
      ...ninjaUpdateDto,
      skills,
    });

    if (!ninja) throw new NotFoundException(`Ninja not found with id of ${id}`);

    return this.ninjaRepository.save(ninja);
  }

  async deleteNinja(id: number): Promise<Ninja> {
    const ninja = await this.getNinjaById(id);

    return this.ninjaRepository.remove(ninja);
  }

  private async preloadSkillByName(name: string): Promise<Skill> {
    const existingSkill = await this.skillRepository.findOneBy({ name: name });

    if (existingSkill) return existingSkill;

    return this.skillRepository.create({ name });
  }
}
