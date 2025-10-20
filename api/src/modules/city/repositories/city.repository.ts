import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '../entities';

export class CityRepository extends Repository<CityEntity> {
  constructor(
    @InjectRepository(CityEntity)
    private repository: Repository<CityEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
