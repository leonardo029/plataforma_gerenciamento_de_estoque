import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelfEntity } from './entities';
import { ShelfRepository } from './repositories';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShelfEntity])],
  controllers: [ShelfController],
  providers: [ShelfService, ShelfRepository],
  exports: [ShelfService],
})
export class ShelfModule {}
