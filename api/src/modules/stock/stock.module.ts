import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities';
import { StockLocationModule } from '../stock-location/stock-location.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity]), StockLocationModule],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockService],
})
export class StockModule {}
