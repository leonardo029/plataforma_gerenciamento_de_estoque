import { StockEntity } from '../entities';

export class FindByEmailUserResource {
  [key: string]: any;

  constructor(entity: StockEntity) {
    this.id = entity.id;
    this.product_id = entity.product_id;
    this.cost_price = entity.cost_price;
  }
}
