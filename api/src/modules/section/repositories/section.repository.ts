import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionEntity } from '../entities';

export class SectionRepository extends Repository<SectionEntity> {
  constructor(
    @InjectRepository(SectionEntity)
    private repository: Repository<SectionEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
