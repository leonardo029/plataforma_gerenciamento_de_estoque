import { Module } from '@nestjs/common';
import { NutritionalInformationService } from './nutritional-information.service';
import { NutritionalInformationRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionalInformationEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([NutritionalInformationEntity])],
  controllers: [],
  providers: [NutritionalInformationService, NutritionalInformationRepository],
  exports: [NutritionalInformationService],
})
export class NutritionalInformationModule {}
