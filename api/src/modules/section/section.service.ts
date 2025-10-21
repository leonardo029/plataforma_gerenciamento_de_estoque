import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionRepository } from './repositories';
import { FindAllSectionResource } from './resources';

@Injectable()
export class SectionService {
  @InjectRepository(SectionRepository)
  private readonly sectionRepository: SectionRepository;

  async findAll(): Promise<FindAllSectionResource[]> {
    const sections = await this.sectionRepository.find();
    return sections.map((section) => new FindAllSectionResource(section));
  }
}
