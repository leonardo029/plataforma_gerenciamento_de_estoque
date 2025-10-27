import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionEntity } from './entities';
import { SectionRepository } from './repositories';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity])],
  controllers: [SectionController],
  providers: [SectionService, SectionRepository],
  exports: [SectionService],
})
export class SectionModule {}
