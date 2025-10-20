import { SupplierEntity } from '../entities';

export class FindByIdSupplierResource {
  [key: string]: any;

  constructor(entity: SupplierEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.address = {
      street: entity.address.street,
      streetType: entity.address.streetType.name,
      complement: entity.address.complement,
      cep: entity.address.cep,
      number: entity.address.number,
      neighborhood: entity.address.neighborhood,
      city: {
        name: entity.address.city.name,
        state: {
          name: entity.address.city.state.name,
          acronym: entity.address.city.state.acronym,
          region: entity.address.city.state.region,
        },
      },
    };
    this.contact = {
      countryCode: entity.contact.country_code,
      ddd: entity.contact.ddd,
      phoneNumber: entity.contact.phone_number,
    };
    this.isActivated = entity.isActivated;
  }
}
