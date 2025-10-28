import { Controller, Get, Inject } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  @Inject(SectionService)
  private readonly sectionService: SectionService;

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }
}
