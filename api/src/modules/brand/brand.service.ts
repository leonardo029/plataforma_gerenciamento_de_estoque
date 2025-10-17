import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from './repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { FindAllOrByIdBrandResource } from './resources';

@Injectable()
export class BrandService {
  @InjectRepository(BrandRepository)
  private readonly brandRepository: BrandRepository;

  async create(createBrandDto: CreateBrandDto): Promise<void> {
    const brand = this.brandRepository.create(createBrandDto);
    await this.brandRepository.save(brand);
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<void> {
    const brand = await this.brandRepository.findOne({ where: { id } });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    Object.assign(brand, updateBrandDto);
    await this.brandRepository.save(brand);
  }

  async delete(id: string): Promise<void> {
    const brand = await this.brandRepository.findOne({
      where: { id: id },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    await this.brandRepository.remove(brand);
  }

  async findAll(): Promise<FindAllOrByIdBrandResource[]> {
    const brands = await this.brandRepository.find();
    return brands.map((brand) => new FindAllOrByIdBrandResource(brand));
  }
}
