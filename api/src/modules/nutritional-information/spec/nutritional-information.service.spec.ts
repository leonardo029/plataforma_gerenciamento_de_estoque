import { Test, TestingModule } from '@nestjs/testing';
import { NutritionalInformationService } from '../nutritional-information.service';

describe('NutritionalInformationService', () => {
  let service: NutritionalInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NutritionalInformationService],
    }).compile();

    service = module.get<NutritionalInformationService>(
      NutritionalInformationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
