import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTransactionEntity } from './entities';
import { StockTransactionRepository } from './repositories';
import { StockTransactionService } from './stock-transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockTransactionEntity])],
  controllers: [],
  providers: [StockTransactionService, StockTransactionRepository],
  exports: [StockTransactionService],
})
export class StockTransactionModule {}
