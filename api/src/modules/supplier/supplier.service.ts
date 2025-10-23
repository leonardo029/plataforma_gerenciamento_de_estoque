import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional';
import { AddressService } from '../address/address.service';
import { ContactService } from '../contact/contact.service';
import { SupplierRepository } from './repositories';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { FindAllSupplierResource, FindByIdSupplierResource } from './resources';

@Injectable()
export class SupplierService {
  @InjectRepository(SupplierRepository)
  private readonly supplierRepository: SupplierRepository;

  @Inject(ContactService)
  private readonly contactService: ContactService;

  @Inject(AddressService)
  private readonly addressService: AddressService;

  @Transactional()
  async create(createSupplierDto: CreateSupplierDto): Promise<void> {
    const contact = await this.contactService.create(createSupplierDto.contact);
    const address = await this.addressService.create(createSupplierDto.address);

    const supplier = this.supplierRepository.create({
      ...createSupplierDto,
      address,
      contact,
    });

    await this.supplierRepository.save(supplier);
  }

  @Transactional()
  async update(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<void> {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
      relations: ['contact', 'address'],
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    const { address, contact, ...supplierData } = updateSupplierDto;
    Object.assign(supplier, supplierData);

    if (address) {
      await this.addressService.update(supplier.address.id, address);
    }

    if (contact) {
      await this.contactService.update(supplier.contact.id, contact);
    }

    await this.supplierRepository.save(supplier);
  }

  @Transactional()
  async delete(id: string): Promise<void> {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
      relations: ['contact', 'address'],
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    await this.supplierRepository.remove(supplier);

    if (supplier.contact) {
      await this.contactService.delete(supplier.contact.id);
    }
    if (supplier.address) {
      await this.addressService.delete(supplier.address.id);
    }
  }

  async findById(id: string): Promise<FindByIdSupplierResource> {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
      relations: [
        'contact',
        'address',
        'address.streetType',
        'address.city',
        'address.city.state',
      ],
    });

    if (!supplier) {
      throw new NotFoundException(`supplier with ID ${id} not found`);
    }

    return new FindByIdSupplierResource(supplier);
  }

  async findAll(): Promise<FindAllSupplierResource[]> {
    const suppliers = await this.supplierRepository.find({
      where: { isActivated: true },
      relations: ['address', 'contact'],
    });
    return suppliers.map((supplier) => new FindAllSupplierResource(supplier));
  }
}
