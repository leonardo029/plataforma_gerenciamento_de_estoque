import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAuditRepository } from './repositories';
import { CreateProductAuditDto } from './dto';

@Injectable()
export class ProductAuditService {
  @InjectRepository(ProductAuditRepository)
  private readonly productAuditRepository: ProductAuditRepository;

  async create(createProductAuditDto: CreateProductAuditDto): Promise<void> {
    const productAudit = this.productAuditRepository.create({
      idProduct: createProductAuditDto.id_product,
      idUser: createProductAuditDto.id_user,
      action: createProductAuditDto.action,
      description: createProductAuditDto.description,
    });
    await this.productAuditRepository.save(productAudit);
  }
}
