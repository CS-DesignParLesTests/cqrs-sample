import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { CreateUserHandler } from './create-user.handler';
import { UsersRepository } from '../../repositories/users-repository';
import { UsersRepositoryMemoryAdapter } from '../../repositories/memory/users-repository-memory.adapter';
import { CreateUserCommand } from '../implements';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { mocked } from 'ts-jest/utils';

// Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/users-repository-memory.adapter');
const MockedUsersRepository = UsersRepositoryMemoryAdapter;

describe('The CreateUserHandler ', () => {
  let createUserHandler: CreateUserHandler;
  let mockedUsersRepository;
  beforeEach(async () => {
    mocked(MockedUsersRepository).mockClear();
    const providers: Provider[] = [
      {
        provide: UsersRepository,
        useClass: MockedUsersRepository,
      },
      CreateUserHandler,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    // get and save the mock instance in order to apply assertions on it later
    mockedUsersRepository = mocked(MockedUsersRepository).mock.instances[0];
    // Mock the create method to to be a function that returns the passed user
    mockedUsersRepository.create.mockImplementation((user) => user);

    createUserHandler = testModule.get(CreateUserHandler);
  });
  describe('execute', function () {
    describe.each([
      { username: 'AmineI', displayName: 'Amine A.' },
      { username: 'candylol', displayName: 'Candice' },
      { username: 'àéùô', displayName: 'Un utilisateur qui aime les accents àéùi' },
    ])('with a payload containing username & displayName', (createUserPayload: CreateUserDto) => {
      it('should return an User with the provided username', async () => {
        const command = new CreateUserCommand(createUserPayload);
        const user = await createUserHandler.execute(command);

        expect(user.username).toBe(createUserPayload.username);
      });
      it('should return an User with the provided displayName', async () => {
        const command = new CreateUserCommand(createUserPayload);
        const user = await createUserHandler.execute(command);

        expect(user.displayName).toBe(createUserPayload.displayName);
      });
      it('should call the repository with a proper User', async () => {
        const command = new CreateUserCommand(createUserPayload);
        await createUserHandler.execute(command);

        expect(mockedUsersRepository.create).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            username: createUserPayload.username,
            displayName: createUserPayload.displayName,
          }),
        );
      });
    });

    describe.each([{ username: 'AmineI' }, { username: 'candylol' }, { username: 'àéùô' }])(
      'with a payload containing only an username ',
      (createUserPayload: CreateUserDto) => {
        it('should return an User with its correct username', async () => {
          const command = new CreateUserCommand(createUserPayload);

          const user = await createUserHandler.execute(command);
          expect(user.username).toBe(createUserPayload.username);
        });
        it('should return an User with the username as a displayName', async () => {
          const command = new CreateUserCommand(createUserPayload);
          const user = await createUserHandler.execute(command);

          expect(user.displayName).toBe(createUserPayload.username);
        });
        it('should call the repository with a proper User ', async () => {
          const command = new CreateUserCommand(createUserPayload);
          await createUserHandler.execute(command);

          expect(mockedUsersRepository.create).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
              username: createUserPayload.username,
              displayName: createUserPayload.username,
            }),
          );
        });
      },
    );

    describe.each([
      {
        exists: { username: 'candylol' },
        doesNotExist: { username: 'AmineI' },
      },
    ])(
      'with a non-empty repository',
      (testParameters: { exists: CreateUserDto; doesNotExist: CreateUserDto }) => {
        beforeEach(() => {
          const existingUser = new User(testParameters.exists);
          mockedUsersRepository.findOneByUsername.mockImplementation(async (username: string) => {
            return username == existingUser.username ? existingUser : undefined;
          });
          mockedUsersRepository.findAll.mockImplementation(() => [existingUser]);
        });

        it('should throw an exception if the username already exists', async () => {
          const command = new CreateUserCommand(testParameters.exists);
          await expect(createUserHandler.execute(command)).rejects.toThrow('User already exists');
        });
        it('should not create the user on database if the username already exists', async () => {
          const command = new CreateUserCommand(testParameters.exists);
          await expect(createUserHandler.execute(command)).rejects.toThrow('User already exists');
          expect(mockedUsersRepository.create).toBeCalledTimes(0);
        });
        it('should create the user on database once if the username does not already exists', async () => {
          const command = new CreateUserCommand(testParameters.doesNotExist);
          await createUserHandler.execute(command);

          expect(mockedUsersRepository.create).toBeCalledTimes(1);
        });
        //TODO Test concurrency ?
      },
    );
  });
});
