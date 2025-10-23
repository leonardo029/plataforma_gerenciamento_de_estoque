import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NutritionalInformationEntity } from '../entities';

export class NutritionalInformationRepository extends Repository<NutritionalInformationEntity> {
  constructor(
    @InjectRepository(NutritionalInformationEntity)
    private repository: Repository<NutritionalInformationEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
