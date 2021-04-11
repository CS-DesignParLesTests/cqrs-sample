import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { BookOwnershipsRepositoryMemoryAdapter } from '../../repositories/memory/book-ownerships-repository-memory.adapter';
import { mocked } from 'ts-jest/utils';
import { BookOwnership } from '../../entities/book-ownership.entity';
import { GetBookOwnershipsByUserHandler } from './get-book-ownerships-by-user.handler';
import { GetBookOwnershipsByUserQuery } from '../implements';

// Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/memory/book-ownerships-repository-memory.adapter');
const MockedRepository = BookOwnershipsRepositoryMemoryAdapter;

describe('The GetBookOwnershipsByUserHandler', () => {
  let getBookOwnershipsByUserHandler: GetBookOwnershipsByUserHandler;
  let mockedRepository;
  beforeEach(async () => {
    mocked(MockedRepository).mockClear();
    const providers: Provider[] = [
      {
        provide: BookOwnershipsRepository,
        useClass: MockedRepository,
      },
      GetBookOwnershipsByUserHandler,
    ];
    const moduleMetadata: ModuleMetadata = {
      providers,
    };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    // get and save the mock instance in order to apply assertions on it later
    mockedRepository = mocked(MockedRepository).mock.instances[0];

    getBookOwnershipsByUserHandler = testModule.get(GetBookOwnershipsByUserHandler);
  });
  describe('execute', function () {
    describe('with a non-empty repository', () => {
      const [username1, username2] = ['candylol', 'AmineI'];
      const [bookId1, bookId2] = ['Mango-paradise', 'Cat-paradise']; // Two great books, indubitably.
      const bookOwnershipList = [
        new BookOwnership({ username: username1, bookId: bookId1 }),
        new BookOwnership({ username: username1, bookId: bookId2 }),
        new BookOwnership({ username: username2, bookId: bookId1 }),
        new BookOwnership({ username: username2, bookId: bookId2 }),
      ];

      beforeEach(() => {
        mockedRepository.findAllByUsername.mockImplementation((username: string) =>
          bookOwnershipList.filter((bookOwnership) => bookOwnership.username == username),
        );
      });

      describe('execute', () => {
        it('should return the expected BookOwnerships with their correct username and displayname', async () => {
          const bookOwnerships1 = await getBookOwnershipsByUserHandler.execute(
            new GetBookOwnershipsByUserQuery(username1),
          );
          expect(bookOwnerships1).toEqual([bookOwnershipList[0], bookOwnershipList[1]]);
          const bookOwnerships2 = await getBookOwnershipsByUserHandler.execute(
            new GetBookOwnershipsByUserQuery(username2),
          );
          expect(bookOwnerships2).toEqual([bookOwnershipList[2], bookOwnershipList[3]]);
        });
      });
    });
  });
});
