import { Test, TestingModule } from '@nestjs/testing';
import { FavourController } from './favour.controller';

describe('FavourController', () => {
  let controller: FavourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavourController],
    }).compile();

    controller = module.get<FavourController>(FavourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
