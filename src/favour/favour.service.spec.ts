import { Test, TestingModule } from '@nestjs/testing';
import { FavourService } from './favour.service';

describe('FavourService', () => {
  let service: FavourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavourService],
    }).compile();

    service = module.get<FavourService>(FavourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
