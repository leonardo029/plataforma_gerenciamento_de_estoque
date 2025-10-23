import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities';

export class ProductRepository extends Repository<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
