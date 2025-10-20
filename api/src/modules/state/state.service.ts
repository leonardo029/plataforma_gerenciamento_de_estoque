import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateRepository } from './repositories';
import { FindAllStateResource } from './resources';

@Injectable()
export class StateService {
  @InjectRepository(StateRepository)
  private readonly stateRepository: StateRepository;

  async findAll(): Promise<FindAllStateResource[]> {
    const states = await this.stateRepository.find();
    return states.map((state) => new FindAllStateResource(state));
  }
}
