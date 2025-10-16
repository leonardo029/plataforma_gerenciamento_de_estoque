import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllUserResource, FindByIdUserResource } from './resources';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ContactService } from '../contact/contact.service';
import { AddressService } from '../address/address.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService {
  @InjectRepository(UserRepository)
  private readonly userRepository: UserRepository;

  @Inject(ContactService)
  private readonly contactService: ContactService;

  @Inject(AddressService)
  private readonly addressService: AddressService;

  @Transactional()
  async create(createUserDto: CreateUserDto): Promise<void> {
    const contact = await this.contactService.create(createUserDto.contact);
    const address = await this.addressService.create(createUserDto.address);

    const user = this.userRepository.create({
      ...createUserDto,
      address,
      contact,
    });

    await this.userRepository.save(user);
  }

  @Transactional()
  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contact', 'address'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { address, contact, ...userData } = updateUserDto;
    Object.assign(user, userData);

    if (address) {
      await this.addressService.update(user.address.id, address);
    }

    if (contact) {
      await this.contactService.update(user.contact.id, contact);
    }

    await this.userRepository.save(user);
  }

  @Transactional()
  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contact', 'address'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);

    if (user.contact) {
      await this.contactService.delete(user.contact.id);
    }
    if (user.address) {
      await this.addressService.delete(user.address.id);
    }
  }

  async findById(id: string): Promise<FindByIdUserResource> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [
        'contact',
        'address',
        'address.streetType',
        'address.city',
        'address.city.state',
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return new FindByIdUserResource(user);
  }

  async findAll(): Promise<FindAllUserResource[]> {
    const users = await this.userRepository.find({
      relations: ['address', 'contact'],
    });
    return users.map((user) => new FindAllUserResource(user));
  }
}
