import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StreetTypeEntity } from '../entities';

export class StreetTypeRepository extends Repository<StreetTypeEntity> {
  constructor(
    @InjectRepository(StreetTypeEntity)
    private repository: Repository<StreetTypeEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
