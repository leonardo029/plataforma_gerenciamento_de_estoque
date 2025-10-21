import { Test, TestingModule } from '@nestjs/testing';
import { CorridorController } from '../corridor.controller';

describe('CorridorController', () => {
  let controller: CorridorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorridorController],
    }).compile();

    controller = module.get<CorridorController>(CorridorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
