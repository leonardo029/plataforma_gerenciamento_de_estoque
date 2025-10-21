import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShelfEntity } from '../entities';

export class ShelfRepository extends Repository<ShelfEntity> {
  constructor(
    @InjectRepository(ShelfEntity)
    private repository: Repository<ShelfEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
