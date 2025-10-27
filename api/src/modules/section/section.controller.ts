import { Controller, Get } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }
}
