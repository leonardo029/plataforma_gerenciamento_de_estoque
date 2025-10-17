import { Injectable, NotFoundException } from '@nestjs/common';
import { NutritionalInformationRepository } from './repositories';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateNutritionalInformationDto,
  UpdateNutritionalInformationDto,
} from './dto';
import { NutritionalInformationEntity } from './entities';

@Injectable()
export class NutritionalInformationService {
  @InjectRepository(NutritionalInformationRepository)
  private readonly nutritionalInformationRepository: NutritionalInformationRepository;

  async create(
    createNutritionalInformationDto: CreateNutritionalInformationDto,
  ): Promise<NutritionalInformationEntity> {
    const nutritionalInformation = this.nutritionalInformationRepository.create(
      createNutritionalInformationDto,
    );
    return await this.nutritionalInformationRepository.save(
      nutritionalInformation,
    );
  }

  async update(
    id: string,
    updateNutritionalInformationDto: UpdateNutritionalInformationDto,
  ): Promise<void> {
    const nutritionalInformation =
      await this.nutritionalInformationRepository.findOne({ where: { id } });

    if (!nutritionalInformation) {
      throw new NotFoundException(
        `Nutritional information with ID ${id} not found`,
      );
    }

    Object.assign(nutritionalInformation, updateNutritionalInformationDto);
    await this.nutritionalInformationRepository.save(nutritionalInformation);
  }

  async delete(id: string): Promise<void> {
    const nutritionalInformation =
      await this.nutritionalInformationRepository.findOne({
        where: { id: id },
      });

    if (!nutritionalInformation) {
      throw new NotFoundException(
        `Nutritional information with ID ${id} not found`,
      );
    }

    await this.nutritionalInformationRepository.remove(nutritionalInformation);
  }
}
