import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { BookOwnershipsRepositoryMemoryAdapter } from '../../repositories/memory/book-ownerships-repository-memory.adapter';
import { UpdateBookOwnershipCommand } from '../implements';
import { mocked } from 'ts-jest/utils';
import { BookOwnership } from '../../entities/book-ownership.entity';
import { UpdateBookOwnershipHandler } from './update-book-ownership.handler';
import { GetBookOwnershipByUserAndIdQuery } from '../../queries/implements/get-book-ownership-by-user-and-id.query';
import { GetBookOwnershipByUserAndIdHandler } from '../../queries/handlers/get-book-ownership-by-user-and-id.handler';
import { UpdateBookOwnershipDto } from '../../dto/update-book-ownership.dto';

// Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/memory/book-ownerships-repository-memory.adapter');
const MockedRepository = BookOwnershipsRepositoryMemoryAdapter;

describe('The UpdateBookOwnershipHandler', () => {
  let updateBookOwnershipHandler: UpdateBookOwnershipHandler;
  let getBookOwernshipHandler: GetBookOwnershipByUserAndIdHandler;

  let mockedRepository;
  beforeEach(async () => {
    mocked(MockedRepository).mockClear();
    const providers: Provider[] = [
      {
        provide: BookOwnershipsRepository,
        useClass: MockedRepository,
      },
      UpdateBookOwnershipHandler,
      GetBookOwnershipByUserAndIdHandler,
    ];
    const moduleMetadata: ModuleMetadata = {
      providers,
    };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    // get and save the mock instance in order to apply assertions on it later
    mockedRepository = mocked(MockedRepository).mock.instances[0];

    updateBookOwnershipHandler = testModule.get(UpdateBookOwnershipHandler);
    getBookOwernshipHandler = testModule.get(GetBookOwnershipByUserAndIdHandler);
  });
  describe('execute', function () {
    describe('with a non-empty repository', () => {
      let existingUserName;
      let existingOwnedBookId;
      let existingNotOwnedBookId;
      let existingBookOwnership;
      beforeEach(() => {
        existingUserName = 'Gabriel';
        existingOwnedBookId = 'An-existing-id-already-owned';
        existingNotOwnedBookId = 'An-existing-id-not-owned';

        existingBookOwnership = new BookOwnership({
          username: existingUserName,
          bookId: existingOwnedBookId,
          isLent: true,
          isBought: true,
          isSigned: true,
        });
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
        mockedRepository.update.mockImplementation(
          (username: string, bookId: string, payload: UpdateBookOwnershipDto) => {
            if (
              username == existingBookOwnership.username &&
              bookId == existingBookOwnership.bookId
            )
              return Object.assign(existingBookOwnership, payload);
            else return undefined;
          },
        );
      });

      it('should throw an error if bookOwnership did not exist', async () => {
        const command = new UpdateBookOwnershipCommand(existingUserName, existingNotOwnedBookId, {
          isBought: false,
          isLent: true,
        });
        await expect(updateBookOwnershipHandler.execute(command)).rejects.toThrow(
          'BookOwnership does not exist',
        );
      });
      it('should only update the lent property of a BookOwnership', async () => {
        const command = new UpdateBookOwnershipCommand(existingUserName, existingOwnedBookId, {
          isLent: false, // isLent pass true to false
        });
        await updateBookOwnershipHandler.execute(command);
        const queryGet = new GetBookOwnershipByUserAndIdQuery(
          existingUserName,
          existingOwnedBookId,
        );
        const bookOwernerShip = await getBookOwernshipHandler.execute(queryGet);
        expect(bookOwernerShip.isLent).toEqual(false);
        expect(bookOwernerShip.isBought).toEqual(true); // expect to not change
      });
      it('should update only the bought property of a BookOwnership', async () => {
        const command = new UpdateBookOwnershipCommand(existingUserName, existingOwnedBookId, {
          isBought: false, // isBought pass true to false
        });
        await updateBookOwnershipHandler.execute(command);
        const queryGet = new GetBookOwnershipByUserAndIdQuery(
          existingUserName,
          existingOwnedBookId,
        );
        const bookOwernerShip = await getBookOwernshipHandler.execute(queryGet);
        expect(bookOwernerShip.isBought).toEqual(false);
        expect(bookOwernerShip.isLent).toEqual(true); // expect to not change
      });
      it('should update the bought and lent property of a BookOwnership', async () => {
        const command = new UpdateBookOwnershipCommand(existingUserName, existingOwnedBookId, {
          isBought: false,
          isLent: true,
        });
        await updateBookOwnershipHandler.execute(command);
        const queryGet = new GetBookOwnershipByUserAndIdQuery(
          existingUserName,
          existingOwnedBookId,
        );
        const bookOwernerShip = await getBookOwernshipHandler.execute(queryGet);
        expect(bookOwernerShip.isBought).toEqual(false); // isBought pass true to false
        expect(bookOwernerShip.isLent).toEqual(true); // isLent pass true to true
      });
    });
  });
});
