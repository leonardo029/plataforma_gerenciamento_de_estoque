import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { NutritionalInformationService } from '../nutritional-information/nutritional-information.service';
import { Transactional } from 'typeorm-transactional';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './dto';
import { FindAllProductResource } from './resources';
import { FindByIdProductResource } from './resources/find-by-id.resource';
import { FindOptionsWhere, ILike } from 'typeorm';
import { ProductEntity } from './entities';

@Injectable()
export class ProductService {
  @InjectRepository(ProductRepository)
  private readonly productRepository: ProductRepository;

  @Inject(NutritionalInformationService)
  private readonly nutritionalInformationService: NutritionalInformationService;

  @Transactional()
  async create(createProductDto: CreateProductDto): Promise<void> {
    const nutritionalInformation =
      await this.nutritionalInformationService.create(
        createProductDto.nutritionalInformation,
      );

    const product = this.productRepository.create({
      ...createProductDto,
      nutritionalInformation,
    });

    await this.productRepository.save(product);
  }

  @Transactional()
  async update(id: string, updateProductDto: UpdateProductDto): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['nutritionalInformation'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const { nutritionalInformation, ...productData } = updateProductDto;
    Object.assign(product, productData);

    if (nutritionalInformation) {
      await this.nutritionalInformationService.update(
        product.nutritionalInformation.id,
        nutritionalInformation,
      );
    }

    await this.productRepository.save(product);
  }

  @Transactional()
  async delete(id: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['nutritionalInformation'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.remove(product);

    if (product.nutritionalInformation) {
      await this.nutritionalInformationService.delete(
        product.nutritionalInformation.id,
      );
    }
  }

  async findById(id: string): Promise<FindByIdProductResource> {
    const user = await this.productRepository.findOne({
      where: { id },
      relations: ['nutritionalInformation', 'brand', 'category'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return new FindByIdProductResource(user);
  }

  async findAll(filters: FilterProductDto): Promise<FindAllProductResource[]> {
    const where: FindOptionsWhere<ProductEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    const products = await this.productRepository.find({
      where,
      relations: ['nutritionalInformation', 'brand', 'category'],
    });

    return products.map((product) => new FindAllProductResource(product));
  }
}
