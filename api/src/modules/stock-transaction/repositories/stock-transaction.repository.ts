import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StockTransactionEntity } from '../entities';

export class StockTransactionRepository extends Repository<StockTransactionEntity> {
  constructor(
    @InjectRepository(StockTransactionEntity)
    private repository: Repository<StockTransactionEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
