import { BrandEntity } from '../entities';

export class FindAllBrandResource {
  [key: string]: any;

  constructor(entity: BrandEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
