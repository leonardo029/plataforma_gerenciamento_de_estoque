import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from '../entities';

export class StockRepository extends Repository<StockEntity> {
  constructor(
    @InjectRepository(StockEntity)
    private repository: Repository<StockEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
