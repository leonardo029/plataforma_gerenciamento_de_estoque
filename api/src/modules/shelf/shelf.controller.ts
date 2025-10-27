import { Controller, Get } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { FindAllShelfResource } from './resources';

@Controller('shelf')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  @Get()
  async findAll(): Promise<FindAllShelfResource[]> {
    return this.shelfService.findAll();
  }
}
