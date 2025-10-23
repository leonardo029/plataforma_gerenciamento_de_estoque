import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { SupplierEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from '../contact/contact.module';
import { AddressModule } from '../address/address.module';
import { SupplierRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierEntity]),
    ContactModule,
    AddressModule,
  ],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository],
  exports: [SupplierService],
})
export class SupplierModule {}
