import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryMemoryAdapter } from './users-repository-memory.adapter';
import { UsersRepository } from './users-repository';

describe('UsersRepository', () => {
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepositoryMemoryAdapter],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepositoryMemoryAdapter);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
