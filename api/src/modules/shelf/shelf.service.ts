import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShelfRepository } from './repositories';
import { FindAllShelfResource } from './resources';

@Injectable()
export class ShelfService {
  @InjectRepository(ShelfRepository)
  private readonly shelfRepository: ShelfRepository;

  async findAll(): Promise<FindAllShelfResource[]> {
    const shelves = await this.shelfRepository.find();
    return shelves.map((shelf) => new FindAllShelfResource(shelf));
  }
}
