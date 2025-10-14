import { UserEntity } from '../entities';

export class FindAllUserResource {
  [key: string]: any;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.address = entity.address;
    this.contact = entity.contact;
  }
}
