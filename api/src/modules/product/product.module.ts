import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repositories';
import { NutritionalInformationModule } from '../nutritional-information/nutritional-information.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    NutritionalInformationModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
