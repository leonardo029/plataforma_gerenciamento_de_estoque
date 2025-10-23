import { Test, TestingModule } from '@nestjs/testing';
import { ProductSupplierController } from '../product-supplier.controller';

describe('ProductSupplierController', () => {
  let controller: ProductSupplierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSupplierController],
    }).compile();

    controller = module.get<ProductSupplierController>(
      ProductSupplierController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
