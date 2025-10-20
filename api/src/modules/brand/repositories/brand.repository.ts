import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entities';

export class BrandRepository extends Repository<BrandEntity> {
  constructor(
    @InjectRepository(BrandEntity)
    private repository: Repository<BrandEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
