import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  @Inject(CityService)
  private readonly cityService: CityService;

  @Get(':id')
  findAllByStateId(@Param('id') id: number) {
    return this.cityService.findAllByStateId(id);
  }
}
