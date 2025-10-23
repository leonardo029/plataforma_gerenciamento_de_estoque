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
    try {
      const { supplier_id, product_id } = createProductSupplierDto;

      const exists = await this.productSupplierRepository.findOne({
        where: { supplier_id, product_id },
      });

      if (!exists) {
        const entity = this.productSupplierRepository.create(
          createProductSupplierDto,
        );
        await this.productSupplierRepository.save(entity);
      }
    } catch (error) {
      throw new Error(`Erro ao criar relação produto-fornecedor: ${error}`);
    }
  }
}
