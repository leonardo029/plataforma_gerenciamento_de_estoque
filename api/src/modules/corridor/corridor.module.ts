import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorridorEntity } from './entities';
import { CorridorRepository } from './repositories';
import { CorridorService } from './corridor.service';

@Module({
  imports: [TypeOrmModule.forFeature([CorridorEntity])],
  controllers: [],
  providers: [CorridorService, CorridorRepository],
  exports: [CorridorService],
})
export class CorridorModule {}
