import { Controller, Get } from '@nestjs/common';
import { SectionService } from './section.service';
import { FindAllSectionResource } from './resources';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  async findAll(): Promise<FindAllSectionResource[]> {
    return this.sectionService.findAll();
  }
}
