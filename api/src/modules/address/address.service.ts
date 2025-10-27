import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository, StreetTypeRepository } from './repositories';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { AddressEntity } from './entities';

@Injectable()
export class AddressService {
  @InjectRepository(AddressRepository)
  private readonly addressRepository: AddressRepository;

  @InjectRepository(StreetTypeRepository)
  private readonly streetTypeRepository: StreetTypeRepository;

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    const Address = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(Address);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<void> {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    Object.assign(address, updateAddressDto);
    await this.addressRepository.save(address);
  }

  async delete(id: string): Promise<void> {
    const address = await this.addressRepository.findOne({
      where: { id: id },
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    await this.addressRepository.remove(address);
  }

  async findAllStreetTypes() {
    return this.streetTypeRepository.find();
  }
}
