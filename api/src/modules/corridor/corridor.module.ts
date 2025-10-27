import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorridorEntity } from './entities';
import { CorridorRepository } from './repositories';
import { CorridorService } from './corridor.service';
import { CorridorController } from './corridor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CorridorEntity])],
  controllers: [CorridorController],
  providers: [CorridorService, CorridorRepository],
  exports: [CorridorService],
})
export class CorridorModule {}
