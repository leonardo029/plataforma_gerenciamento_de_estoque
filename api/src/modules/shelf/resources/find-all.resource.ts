import { ShelfEntity } from '../entities';

export class FindAllShelfResource {
  [key: string]: any;

  constructor(entity: ShelfEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
