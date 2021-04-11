import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { BookOwnershipsRepositoryMemoryAdapter } from '../../repositories/memory/book-ownerships-repository-memory.adapter';
import { mocked } from 'ts-jest/utils';
import { BookOwnership } from '../../entities/book-ownership.entity';
import { GetBookOwnershipByUserAndIdHandler } from './get-book-ownership-by-user-and-id.handler';
import { GetBookOwnershipByUserAndIdQuery } from '../implements';

// Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/memory/book-ownerships-repository-memory.adapter');
const MockedRepository = BookOwnershipsRepositoryMemoryAdapter;

describe(' The GetBookOwnershipByUserAndIdHandler', () => {
  let getBookOwnershipByUserAndIdHandler: GetBookOwnershipByUserAndIdHandler;
  let mockedRepository;
  beforeEach(async () => {
    mocked(MockedRepository).mockClear();
    const providers: Provider[] = [
      {
        provide: BookOwnershipsRepository,
        useClass: MockedRepository,
      },
      GetBookOwnershipByUserAndIdHandler,
    ];
    const moduleMetadata: ModuleMetadata = {
      providers,
    };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    // get and save the mock instance in order to apply assertions on it later
    mockedRepository = mocked(MockedRepository).mock.instances[0];

    getBookOwnershipByUserAndIdHandler = testModule.get(GetBookOwnershipByUserAndIdHandler);
  });
  describe('execute', function () {
    describe('with a non-empty repository', () => {
      const existingUserName = 'candylol';
      const invalidUserName = 'AmineI';
      const existingOwnedBookId = 'An-existing-id-already-owned';
      const existingNotOwnedBookId = 'An-existing-id-not-owned';

      const existingBookOwnership = new BookOwnership({
        username: existingUserName,
        bookId: existingOwnedBookId,
      });
      beforeEach(() => {
        mockedRepository.findOneByUsernameAndId.mockImplementation(
          (username: string, bookId: string) => {
            if (
              username == existingBookOwnership.username &&
              bookId == existingBookOwnership.bookId
            )
              return existingBookOwnership;
            else return undefined;
          },
        );
      });

      it('should return the correct BookOwnership if it exists', async () => {
        const query = new GetBookOwnershipByUserAndIdQuery(existingUserName, existingOwnedBookId);
        const obtainedBookOwnership = await getBookOwnershipByUserAndIdHandler.execute(query);
        expect(obtainedBookOwnership).toBe(existingBookOwnership);
      });
      it('should return undefined if the bookOwnership did not already exist for an existing user', async () => {
        const query = new GetBookOwnershipByUserAndIdQuery(
          existingUserName,
          existingNotOwnedBookId,
        );

        const obtainedBookOwnership = await getBookOwnershipByUserAndIdHandler.execute(query);
        expect(obtainedBookOwnership).toBeUndefined();
      });
      it('should return undefined if the bookOwnership did not already exist for a missing user', async () => {
        const query = new GetBookOwnershipByUserAndIdQuery(invalidUserName, existingNotOwnedBookId);

        const obtainedBookOwnership = await getBookOwnershipByUserAndIdHandler.execute(query);
        expect(obtainedBookOwnership).toBeUndefined();
      });
    });
  });
});
