import { Controller, Get } from '@nestjs/common';
import { ShelfService } from './shelf.service';

@Controller('shelf')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  @Get()
  findAll() {
    return this.shelfService.findAll();
  }
}
