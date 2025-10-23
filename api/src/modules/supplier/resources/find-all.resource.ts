import { SupplierEntity } from '../entities';

export class FindAllSupplierResource {
  [key: string]: any;

  constructor(entity: SupplierEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
  }
}
