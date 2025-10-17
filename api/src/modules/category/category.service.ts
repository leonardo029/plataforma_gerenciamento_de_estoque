import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { FindAllCategoryResource } from './resources';

@Injectable()
export class CategoryService {
  @InjectRepository(CategoryRepository)
  private readonly categoryRepository: CategoryRepository;

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    Object.assign(category, updateCategoryDto);
    await this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.categoryRepository.remove(category);
  }

  async findAll(): Promise<FindAllCategoryResource[]> {
    const categorys = await this.categoryRepository.find();
    return categorys.map((category) => new FindAllCategoryResource(category));
  }
}
