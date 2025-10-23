import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CorridorRepository } from './repositories';
import { FindAllCorridorResource } from './resources';

@Injectable()
export class CorridorService {
  @InjectRepository(CorridorRepository)
  private readonly corridorRepository: CorridorRepository;

  async findAll(): Promise<FindAllCorridorResource[]> {
    const corridors = await this.corridorRepository.find();
    return corridors.map((corridor) => new FindAllCorridorResource(corridor));
  }
}
