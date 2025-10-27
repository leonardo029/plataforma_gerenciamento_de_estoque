import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity, StreetTypeEntity } from './entities';
import { AddressService } from './address.service';
import { AddressRepository, StreetTypeRepository } from './repositories';
import { AddressController } from './address.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, StreetTypeEntity])],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, StreetTypeRepository],
  exports: [AddressService],
})
export class AddressModule {}
