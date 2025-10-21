import { Module } from '@nestjs/common';
import { ProductAuditService } from './product-audit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAuditEntity } from './entities';
import { ProductAuditRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAuditEntity])],
  controllers: [],
  providers: [ProductAuditService, ProductAuditRepository],
  exports: [ProductAuditService],
})
export class ProductAuditModule {}
