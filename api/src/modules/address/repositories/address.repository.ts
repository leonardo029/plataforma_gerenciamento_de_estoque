import { Repository } from 'typeorm';
import { AddressEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

export class AddressRepository extends Repository<AddressEntity> {
  constructor(
    @InjectRepository(AddressEntity)
    private repository: Repository<AddressEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
