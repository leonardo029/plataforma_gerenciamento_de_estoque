import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelfEntity } from './entities';
import { ShelfRepository } from './repositories';
import { ShelfService } from './shelf.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShelfEntity])],
  controllers: [],
  providers: [ShelfService, ShelfRepository],
  exports: [ShelfService],
})
export class ShelfModule {}
