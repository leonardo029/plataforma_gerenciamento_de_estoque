import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StockLocationEntity } from '../entities';

export class StockLocationRepository extends Repository<StockLocationEntity> {
  constructor(
    @InjectRepository(StockLocationEntity)
    private repository: Repository<StockLocationEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
