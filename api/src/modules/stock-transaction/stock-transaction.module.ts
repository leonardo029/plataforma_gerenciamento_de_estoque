import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLocationRepository } from '../stock-location/repositories';
import { StockTransactionEntity } from './entities';
import { StockTransactionService } from './stock-transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockTransactionEntity])],
  controllers: [],
  providers: [StockTransactionService, StockLocationRepository],
  exports: [StockTransactionService],
})
export class StockTransactionModule {}
