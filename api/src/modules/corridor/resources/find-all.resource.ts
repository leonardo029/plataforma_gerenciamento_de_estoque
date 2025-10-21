import { CorridorEntity } from '../entities';

export class FindAllCorridorResource {
  [key: string]: any;

  constructor(entity: CorridorEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
