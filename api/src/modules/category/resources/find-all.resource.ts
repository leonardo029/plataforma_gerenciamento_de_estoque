import { CategoryEntity } from '../entities';

export class FindAllCategoryResource {
  [key: string]: any;

  constructor(entity: CategoryEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
