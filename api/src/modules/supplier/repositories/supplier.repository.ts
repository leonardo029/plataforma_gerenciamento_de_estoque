import { Repository } from 'typeorm';
import { SupplierEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

export class SupplierRepository extends Repository<SupplierEntity> {
  constructor(
    @InjectRepository(SupplierEntity)
    private repository: Repository<SupplierEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
