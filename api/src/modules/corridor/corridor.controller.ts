import { Controller, Get, Inject } from '@nestjs/common';
import { CorridorService } from './corridor.service';

@Controller('corridor')
export class CorridorController {
  @Inject(CorridorService)
  private readonly corridorService: CorridorService;

  @Get()
  findAll() {
    return this.corridorService.findAll();
  }
}
