import { StateEntity } from '../entities';

export class FindAllStateResource {
  [key: string]: any;

  constructor(entity: StateEntity) {
    this.stateCode = entity.state_code;
    this.acronym = entity.acronym;
    this.name = entity.name;
  }
}
