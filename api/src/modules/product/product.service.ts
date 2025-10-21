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
import { ProductAuditService } from '../product-audit/product-audit.service';
import { CreateProductAuditDto } from '../product-audit/dto';
import { ActionType } from '../product-audit/types/action-type';

@Injectable()
export class ProductService {
  @InjectRepository(ProductRepository)
  private readonly productRepository: ProductRepository;

  @Inject(NutritionalInformationService)
  private readonly nutritionalInformationService: NutritionalInformationService;

  @Inject(ProductAuditService)
  private readonly productAuditService: ProductAuditService;

  @Transactional()
  async create(createProductDto: CreateProductDto, id: string): Promise<void> {
    const nutritionalInformation =
      await this.nutritionalInformationService.create(
        createProductDto.nutritionalInformation,
      );

    const product = this.productRepository.create({
      ...createProductDto,
      nutritionalInformation,
    });

    await this.productRepository.save(product);

    const infosAudit: CreateProductAuditDto = {
      id_product: product.id,
      id_user: id,
      action: ActionType.CREATE,
      description: `Creation of the ${product.name} product`,
    };

    await this.productAuditService.create(infosAudit);
  }

  @Transactional()
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    userId: string,
  ): Promise<void> {
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

    const infosAudit: CreateProductAuditDto = {
      id_product: product.id,
      id_user: userId,
      action: ActionType.UPDATE,
      description: `Update of the ${product.name} product`,
    };

    await this.productAuditService.create(infosAudit);
  }

  @Transactional()
  async delete(id: string, userId: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['nutritionalInformation'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const infosAudit: CreateProductAuditDto = {
      id_product: product.id,
      id_user: userId,
      action: ActionType.DELETE,
      description: `Soft delete of the ${product.name} product`,
    };

    await this.productAuditService.create(infosAudit);

    product.isActivated = false;
    await this.productRepository.save(product);
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
