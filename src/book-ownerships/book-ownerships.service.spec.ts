import { Test, TestingModule } from '@nestjs/testing';
import { BookOwnershipsService } from './book-ownerships.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('BookOwnershipsService', () => {
  let service: BookOwnershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [BookOwnershipsService],
    }).compile();

    service = module.get<BookOwnershipsService>(BookOwnershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
