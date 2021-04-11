import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { BookOwnershipsRepositoryMemoryAdapter } from '../../repositories/memory/book-ownerships-repository-memory.adapter';
import { DeleteBookOwnershipCommand } from '../implements';
import { mocked } from 'ts-jest/utils';
import { BookOwnership } from '../../entities/book-ownership.entity';
import { DeleteBookOwnershipHandler } from './delete-book-ownership.handler';

// Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/memory/book-ownerships-repository-memory.adapter');
const MockedRepository = BookOwnershipsRepositoryMemoryAdapter;

describe('The DeleteBookOwnershipHandler', () => {
  let deleteBookOwnershipHandler: DeleteBookOwnershipHandler;
  let mockedRepository;
  beforeEach(async () => {
    mocked(MockedRepository).mockClear();
    const providers: Provider[] = [
      {
        provide: BookOwnershipsRepository,
        useClass: MockedRepository,
      },
      DeleteBookOwnershipHandler,
    ];
    const moduleMetadata: ModuleMetadata = {
      providers,
    };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    // get and save the mock instance in order to apply assertions on it later
    mockedRepository = mocked(MockedRepository).mock.instances[0];

    deleteBookOwnershipHandler = testModule.get(DeleteBookOwnershipHandler);
  });
  describe('execute', function () {
    describe('with a non-empty repository', () => {
      const existingUserName = 'candylol';
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

      it('should call the delete method once on the repository if the bookOwnership exists', async () => {
        const command = new DeleteBookOwnershipCommand(existingUserName, existingOwnedBookId);
        await deleteBookOwnershipHandler.execute(command);
        expect(mockedRepository.delete).toHaveBeenNthCalledWith(
          1,
          existingUserName,
          existingOwnedBookId,
        );
      });
      it('should throw an error if bookOwnership did not already exist', async () => {
        const command = new DeleteBookOwnershipCommand(existingUserName, existingNotOwnedBookId);
        await expect(deleteBookOwnershipHandler.execute(command)).rejects.toThrow(
          'BookOwnership does not exist',
        );
      });
      it('should not call the repository delete method if the BookOwnership did not already exist', async () => {
        const command = new DeleteBookOwnershipCommand(existingUserName, existingNotOwnedBookId);
        await expect(deleteBookOwnershipHandler.execute(command)).rejects.toThrow(
          'BookOwnership does not exist',
        );

        expect(mockedRepository.delete).toBeCalledTimes(0);
      });
    });
  });
});
