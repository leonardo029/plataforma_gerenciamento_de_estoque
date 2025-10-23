import { UserEntity } from '../entities';

export class FindByEmailUserResource {
  [key: string]: any;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.password = entity.password;
    this.isActivated = entity.isActivated;
  }
}
