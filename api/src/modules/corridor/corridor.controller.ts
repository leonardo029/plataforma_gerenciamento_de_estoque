import { Controller, Get } from '@nestjs/common';
import { CorridorService } from './corridor.service';

@Controller('corridor')
export class CorridorController {
  constructor(private readonly corridorService: CorridorService) {}

  @Get()
  findAll() {
    return this.corridorService.findAll();
  }
}
