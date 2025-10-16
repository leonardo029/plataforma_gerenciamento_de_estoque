import { Repository } from 'typeorm';
import { ContactEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

export class ContactRepository extends Repository<ContactEntity> {
  constructor(
    @InjectRepository(ContactEntity)
    private repository: Repository<ContactEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
