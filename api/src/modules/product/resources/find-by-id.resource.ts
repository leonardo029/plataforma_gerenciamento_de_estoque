import { ProductEntity } from '../entities';

export class FindByIdProductResource {
  [key: string]: any;

  constructor(entity: ProductEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.identification_code = entity.identificationCode;
    this.description = entity.description;
    this.brand = { id: entity.brand.id, name: entity.brand.name };
    this.category = { id: entity.category.id, name: entity.category.name };
    this.nutritional_information = {
      id: entity.nutritionalInformation.id,
      portion: entity.nutritionalInformation.portion,
      carbohydrate: entity.nutritionalInformation.carbohydrate,
      protein: entity.nutritionalInformation.protein,
      total_fat: entity.nutritionalInformation.totalFat,
      fiber: entity.nutritionalInformation.fiber,
      is_allergenic: entity.nutritionalInformation.isAllergenic,
    };
    this.unit_of_measurement = entity.unitOfMeasurement;
  }
}
