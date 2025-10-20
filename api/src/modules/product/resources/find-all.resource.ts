import { ProductEntity } from '../entities';

export class FindAllProductResource {
  [key: string]: any;

  constructor(entity: ProductEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.identification_code = entity.identificationCode;
    this.brand = entity.brand.name;
    this.category = entity.category.name;
  }
}
