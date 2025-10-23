import { Test, TestingModule } from '@nestjs/testing';
import { NutritionalInformationController } from '../nutritional-information.controller';

describe('NutritionalInformationController', () => {
  let controller: NutritionalInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NutritionalInformationController],
    }).compile();

    controller = module.get<NutritionalInformationController>(
      NutritionalInformationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
