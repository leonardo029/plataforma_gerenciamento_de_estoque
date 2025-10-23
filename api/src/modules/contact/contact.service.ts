import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactRepository } from './repositories';
import { CreateContactDto } from './dto';
import { ContactEntity } from './entities';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  @InjectRepository(ContactRepository)
  private readonly contactRepository: ContactRepository;

  async create(createContactDto: CreateContactDto): Promise<ContactEntity> {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contact);
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<void> {
    const contact = await this.contactRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    Object.assign(contact, updateContactDto);
    await this.contactRepository.save(contact);
  }

  async delete(id: string): Promise<void> {
    const contact = await this.contactRepository.findOne({
      where: { id: id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    await this.contactRepository.remove(contact);
  }
}
