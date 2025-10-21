import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAuditRepository } from './repositories';
import { CreateProductAuditDto } from './dto';

@Injectable()
export class ProductAuditService {
  @InjectRepository(ProductAuditRepository)
  private readonly productAuditRepository: ProductAuditRepository;

  async create(createProductAuditDto: CreateProductAuditDto): Promise<void> {
    const productAudit = this.productAuditRepository.create(
      createProductAuditDto,
    );
    await this.productAuditRepository.save(productAudit);
  }
}
