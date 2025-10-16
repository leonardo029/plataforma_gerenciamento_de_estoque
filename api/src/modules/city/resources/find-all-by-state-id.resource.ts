import { CityEntity } from '../entities';

export class findAllByStateIdCityResource {
  [key: string]: any;

  constructor(entity: CityEntity) {
    this.id = entity.ibge_code;
    this.name = entity.name;
  }
}
