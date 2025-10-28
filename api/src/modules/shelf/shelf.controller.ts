import { Controller, Get, Inject } from '@nestjs/common';
import { ShelfService } from './shelf.service';

@Controller('shelf')
export class ShelfController {
  @Inject(ShelfService)
  private readonly shelfService: ShelfService;

  @Get()
  findAll() {
    return this.shelfService.findAll();
  }
}
