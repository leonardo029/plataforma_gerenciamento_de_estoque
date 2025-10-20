import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities';
import { AddressService } from './address.service';
import { AddressRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [],
  providers: [AddressService, AddressRepository],
  exports: [AddressService],
})
export class AddressModule {}
