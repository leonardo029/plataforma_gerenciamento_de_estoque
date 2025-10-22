import { StockEntity } from '../entities';

export class FindByIdStockResource {
  [key: string]: any;

  constructor(entity: StockEntity) {
    this.id = entity.id;
    this.batch = entity.batch;
    this.expiration_date = entity.expiration_date;
    this.cost_price = entity.cost_price;
    this.sale_price = entity.sale_price;
    this.stock_quantity = entity.stock_quantity;
    this.product = {
      id: entity.product.id,
      name: entity.product.name,
      identification_code: entity.product.identificationCode,
      description: entity.product.description,
      brand: {
        id: entity.product.brand.id,
        name: entity.product.brand.name,
      },
      category: {
        id: entity.product.category.id,
        name: entity.product.category.name,
      },
      unit_of_measurement: entity.product.unitOfMeasurement,
    };
    this.supplier = {
      id: entity.supplier.id,
      name: entity.supplier.name,
      email: entity.supplier.email,
    };
    this.stockLocation = {
      shelf: entity.stockLocation.shelf.name,
      corridor: entity.stockLocation.corridor.name,
      section: entity.stockLocation.section.name,
    };
  }
}
