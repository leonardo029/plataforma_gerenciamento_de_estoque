import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSupplierEntity } from '../entities';

export class ProductSupplierRepository extends Repository<ProductSupplierEntity> {
  constructor(
    @InjectRepository(ProductSupplierEntity)
    private repository: Repository<ProductSupplierEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
