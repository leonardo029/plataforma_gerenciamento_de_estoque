import { Test, TestingModule } from '@nestjs/testing';
import { ProductAuditController } from '../product-audit.controller';

describe('ProductAuditController', () => {
  let controller: ProductAuditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductAuditController],
    }).compile();

    controller = module.get<ProductAuditController>(ProductAuditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
