import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductSupplierDto } from './dto';
import { ProductSupplierRepository } from './repositories';

@Injectable()
export class ProductSupplierService {
  @InjectRepository(ProductSupplierRepository)
  private readonly productSupplierRepository: ProductSupplierRepository;

  async create(
    createProductSupplierDto: CreateProductSupplierDto,
  ): Promise<void> {
    const productAudit = this.productSupplierRepository.create(
      createProductSupplierDto,
    );
    await this.productSupplierRepository.save(productAudit);
  }
}
