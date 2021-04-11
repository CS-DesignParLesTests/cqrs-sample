import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { CreateBookOwnershipHandler } from './create-book-ownership.handler';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { BookOwnershipsRepositoryMemoryAdapter } from '../../repositories/memory/book-ownerships-repository-memory.adapter';
import { CreateBookOwnershipCommand } from '../implements';
import { mocked } from 'ts-jest/utils';
import { BookOwnership } from '../../entities/book-ownership.entity';
import { BooksService } from '../../../books/books.service';
import { UsersService } from '../../../users/users.service';
import { User } from '../../../users/entities/user.entity';
import { Book } from '../../../books/entities/book.entity';

// Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/memory/book-ownerships-repository-memory.adapter');
const MockedRepository = BookOwnershipsRepositoryMemoryAdapter;

describe('The CreateBookOwnershipHandler ', () => {
  let createBookOwnershipHandler: CreateBookOwnershipHandler;
  let mockedRepository;
  const mockedUsersService = {
    findByUsername: jest.fn(),
  };
  const mockedBooksService = {
    find: jest.fn(),
  };
  beforeEach(async () => {
    mocked(MockedRepository).mockClear();
    const providers: Provider[] = [
      {
        provide: BookOwnershipsRepository,
        useClass: MockedRepository,
      },
      UsersService,
      BooksService,
      CreateBookOwnershipHandler,
    ];
    const moduleMetadata: ModuleMetadata = {
      providers,
    };
    const testModule = await Test.createTestingModule(moduleMetadata)
      .overrideProvider(UsersService)
      .useValue(mockedUsersService)
      .overrideProvider(BooksService)
      .useValue(mockedBooksService)
      .compile();

    // get and save the mock instance in order to apply assertions on it later
    mockedRepository = mocked(MockedRepository).mock.instances[0];
    // Mock the create method to to be a function that returns the passed user
    mockedRepository.create.mockImplementation((bookOwnership: BookOwnership) => bookOwnership);

    createBookOwnershipHandler = testModule.get(CreateBookOwnershipHandler);
  });
  describe('execute', function () {
    describe('with all existing users and books', () => {
      beforeEach(() => {
        mockedUsersService.findByUsername = jest.fn((username) => new User({ username }));
        mockedBooksService.find = jest.fn((id) => new Book({ id }));
      });
      describe.each([
        {
          username: 'AmineI',
          payload: {
            bookId: 'A-really-good-book-Amine-loves',
            isBought: true,
            isSigned: true,
            isLent: true,
          },
        },
        {
          username: 'candylol',
          payload: { bookId: 'A-really-good-book-Amine-owns', isBought: false },
          dateRead: new Date(2021, 4, 18),
        },
        {
          username: 'candylol',
          payload: {
            bookId: 'A-really-good-book-Candice-owns',
            isBought: true,
            dateAcquired: new Date(2019, 5, 31),
          },
        },
      ])('with a username and a payload with different parameters', ({ username, payload }) => {
        it('should return a bookOwnership with the provided properties', async () => {
          const command = new CreateBookOwnershipCommand(username, payload);
          const bookOwnership = await createBookOwnershipHandler.execute(command);

          expect(bookOwnership).toMatchObject({
            username: username,
            ...payload,
          });
        });
        it('should call the repository with the correct payload', async () => {
          const command = new CreateBookOwnershipCommand(username, payload);
          await createBookOwnershipHandler.execute(command);

          expect(mockedRepository.create).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
              username: username,
              ...payload,
            }),
          );
        });
      });
    });
    describe('with a non-empty repository', () => {
      const existingUserName = 'candylol';
      const existingOwnedBookId = 'An-existing-id-already-owned';
      const existingNotOwnedBookId = 'An-existing-id-not-owned';
      const invalidUserName = 'AmineI';
      const invalidBookId = 'A-book-that-does-not-exist';

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
        mockedBooksService.find.mockImplementation((bookId) =>
          bookId == existingOwnedBookId || bookId == existingNotOwnedBookId
            ? new Book({ id: bookId })
            : undefined,
        );
        mockedUsersService.findByUsername.mockImplementation((username) =>
          username == existingUserName ? new User(username) : undefined,
        );
      });

      it('should throw an exception if the bookOwnership already exists, if User & Book exists', async () => {
        const command = new CreateBookOwnershipCommand(existingUserName, {
          bookId: existingOwnedBookId,
        });
        await expect(createBookOwnershipHandler.execute(command)).rejects.toThrow(
          'BookOwnership already exists',
        );
      });
      it('should not create the bookOwnership on database if it already exists', async () => {
        const command = new CreateBookOwnershipCommand(existingUserName, {
          bookId: existingOwnedBookId,
        });
        await expect(createBookOwnershipHandler.execute(command)).rejects.toThrow(
          'BookOwnership already exists',
        );
        expect(mockedRepository.create).toBeCalledTimes(0);
      });
      it('should create the BookOwnership on database once if the BookOwnership does not already exists and User & Book exists', async () => {
        const command = new CreateBookOwnershipCommand(existingUserName, {
          bookId: existingNotOwnedBookId,
        });
        await createBookOwnershipHandler.execute(command);

        expect(mockedRepository.create).toBeCalledTimes(1);
      });
      it('should throw and not create the BookOwnership on database if the User does not exist', async () => {
        const command = new CreateBookOwnershipCommand(invalidUserName, {
          bookId: existingNotOwnedBookId,
        });

        await expect(createBookOwnershipHandler.execute(command)).rejects.toThrow(
          'User or Book does not exist',
        );
        expect(mockedRepository.create).toBeCalledTimes(0);
      });
      it('should throw and not create the BookOwnership on database if the Book does not exist', async () => {
        const command = new CreateBookOwnershipCommand(existingUserName, {
          bookId: invalidBookId,
        });

        await expect(createBookOwnershipHandler.execute(command)).rejects.toThrow(
          'User or Book does not exist',
        );
        expect(mockedRepository.create).toBeCalledTimes(0);
      });
      it('should throw and not create the BookOwnership on database if both User & Book does not exist', async () => {
        const command = new CreateBookOwnershipCommand(invalidUserName, {
          bookId: invalidBookId,
        });

        await expect(createBookOwnershipHandler.execute(command)).rejects.toThrow(
          'User or Book does not exist',
        );
        expect(mockedRepository.create).toBeCalledTimes(0);
      });
    });
  });
});
