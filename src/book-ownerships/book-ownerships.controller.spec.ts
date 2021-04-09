import { Test, TestingModule } from '@nestjs/testing';
import { BookOwnershipsController } from './book-ownerships.controller';
import { BookOwnershipsService } from './book-ownerships.service';

describe('BookOwnershipsController', () => {
  let controller: BookOwnershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookOwnershipsController],
      providers: [BookOwnershipsService],
    }).compile();

    controller = module.get<BookOwnershipsController>(BookOwnershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
