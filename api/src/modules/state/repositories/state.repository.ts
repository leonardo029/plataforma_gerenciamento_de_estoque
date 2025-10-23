import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from '../entities';

export class StateRepository extends Repository<StateEntity> {
  constructor(
    @InjectRepository(StateEntity)
    private repository: Repository<StateEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
