import { StockEntity } from '../entities';

export class FindAllStockResource {
  [key: string]: any;

  constructor(entity: StockEntity) {
    this.id = entity.id;
    this.batch = entity.batch;
    this.cost_price = entity.cost_price;
    this.sale_price = entity.sale_price;
    this.stock_quantity = entity.stock_quantity;
    this.product = {
      name: entity.product.name,
      identification_code: entity.product.identificationCode,
    };
    this.is_activated = entity.isActivated;
  }
}
