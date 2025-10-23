import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CorridorEntity } from '../entities';

export class CorridorRepository extends Repository<CorridorEntity> {
  constructor(
    @InjectRepository(CorridorEntity)
    private repository: Repository<CorridorEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
