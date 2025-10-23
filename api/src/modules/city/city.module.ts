import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  providers: [CityService, CityRepository],
  controllers: [CityController],
  exports: [CityService],
})
export class CityModule {}
