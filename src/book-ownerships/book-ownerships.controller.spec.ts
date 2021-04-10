import { Test, TestingModule } from '@nestjs/testing';
import { BookOwnershipsController } from './book-ownerships.controller';
import { BookOwnershipsService } from './book-ownerships.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('BookOwnershipsController', () => {
  let controller: BookOwnershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [BookOwnershipsController],
      providers: [BookOwnershipsService],
    }).compile();

    controller = module.get<BookOwnershipsController>(BookOwnershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
