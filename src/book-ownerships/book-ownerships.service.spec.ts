import { Test, TestingModule } from '@nestjs/testing';
import { BookOwnershipsService } from './book-ownerships.service';

describe('BookOwnershipsService', () => {
  let service: BookOwnershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookOwnershipsService],
    }).compile();

    service = module.get<BookOwnershipsService>(BookOwnershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
