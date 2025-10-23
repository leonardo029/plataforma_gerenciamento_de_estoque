import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities';
import { StockLocationModule } from '../stock-location/stock-location.module';
import { StockTransactionModule } from '../stock-transaction/stock-transaction.module';
import { ProductSupplierModule } from '../product-supplier/product-supplier.module';
import { SupplierModule } from '../supplier/supplier.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockEntity]),
    StockLocationModule,
    StockTransactionModule,
    ProductSupplierModule,
    SupplierModule,
  ],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockService],
})
export class StockModule {}
