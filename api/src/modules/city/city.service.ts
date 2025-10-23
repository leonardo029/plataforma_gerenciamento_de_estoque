import { Injectable } from '@nestjs/common';
import { CityRepository } from './repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { findAllByStateIdCityResource } from './resources';

@Injectable()
export class CityService {
  @InjectRepository(CityRepository)
  private readonly cityRepository: CityRepository;

  async findAllByStateId(id: number): Promise<findAllByStateIdCityResource[]> {
    const cities = await this.cityRepository.find({
      where: { idstate_code: id },
    });
    return cities.map((city) => new findAllByStateIdCityResource(city));
  }
}
