import { Controller, Get } from '@nestjs/common';
import { CorridorService } from './corridor.service';
import { FindAllCorridorResource } from './resources';

@Controller('corridor')
export class CorridorController {
  constructor(private readonly corridorService: CorridorService) {}

  @Get()
  async findAll(): Promise<FindAllCorridorResource[]> {
    return this.corridorService.findAll();
  }
}
