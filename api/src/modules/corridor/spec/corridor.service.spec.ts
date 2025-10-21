import { Test, TestingModule } from '@nestjs/testing';
import { CorridorService } from '../corridor.service';

describe('CorridorService', () => {
  let service: CorridorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorridorService],
    }).compile();

    service = module.get<CorridorService>(CorridorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
