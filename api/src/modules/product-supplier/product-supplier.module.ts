import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSupplierService } from './product-supplier.service';
import { ProductSupplierEntity } from './entities';
import { ProductSupplierRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSupplierEntity])],
  controllers: [],
  providers: [ProductSupplierService, ProductSupplierRepository],
  exports: [ProductSupplierService],
})
export class ProductSupplierModule {}
