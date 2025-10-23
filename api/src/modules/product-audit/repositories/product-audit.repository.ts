import { Repository } from 'typeorm';
import { ProductAuditEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductAuditRepository extends Repository<ProductAuditEntity> {
  constructor(
    @InjectRepository(ProductAuditEntity)
    private repository: Repository<ProductAuditEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
