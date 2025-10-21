import { Module } from '@nestjs/common';
import { StockLocationService } from './stock-location.service';
import { StockLocationEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLocationRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([StockLocationEntity])],
  controllers: [],
  providers: [StockLocationService, StockLocationRepository],
  exports: [StockLocationService],
})
export class StockLocationModule {}
