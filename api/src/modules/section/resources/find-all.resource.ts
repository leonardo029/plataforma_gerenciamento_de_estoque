import { SectionEntity } from '../entities';

export class FindAllSectionResource {
  [key: string]: any;

  constructor(entity: SectionEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
