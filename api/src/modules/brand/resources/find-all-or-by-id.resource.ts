import { BrandEntity } from '../entities';

export class FindAllOrByIdBrandResource {
  [key: string]: any;

  constructor(entity: BrandEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
