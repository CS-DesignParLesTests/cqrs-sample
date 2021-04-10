import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { mocked } from 'ts-jest/utils';
import { UsersRepositoryMemoryAdapter } from '../../repositories/memory/users-repository-memory.adapter';
import { UsersRepository } from '../../repositories/users-repository';
import { UpdateUserHandler } from './update-user.handler';
import { UpdateUserCommand } from '../implements/update-user.command';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { GetUserByUsernameQuery } from '../../queries/implements/get-user-by-username.query';
import { GetUserByUsernameHandler } from '../../queries/handlers/get-user-by-username.handler';
import { User } from '../../entities/user.entity';

//Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/memory/users-repository-memory.adapter');
const MockedUsersRepository = UsersRepositoryMemoryAdapter;

interface UpdateParameters {
  username: string;
  updateUserPayload: UpdateUserDto;
}

describe('UpdateUserHandler', () => {
  let updateUserHandler: UpdateUserHandler, getUserHandler: GetUserByUsernameHandler;
  let mockedUsersRepository;
  beforeEach(async () => {
    //Reset the mock instances
    mocked(MockedUsersRepository).mockClear();
    //Provide the Mocked class as a provider for the test module
    const providers: Provider[] = [
      {
        provide: UsersRepository,
        useClass: MockedUsersRepository,
      },
      UpdateUserHandler,
      GetUserByUsernameHandler,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();
    //get and save the mock instance in order to apply assertions on it later
    mockedUsersRepository = mocked(MockedUsersRepository).mock.instances[0];
    //Mock the update and get method to to be a function that returns the passed user
    updateUserHandler = testModule.get(UpdateUserHandler);
    getUserHandler = testModule.get(GetUserByUsernameHandler);
  });
  describe('execute', function () {
    describe.each([
      {
        username: 'candylol',
        updateUserPayload: { displayName: 'Candice' },
      },
      {
        username: 'AmineI',
        updateUserPayload: { displayName: 'AmineA' },
      },
    ])('with a payload containing username & displayName', (testParameters: UpdateParameters) => {
      beforeEach(() => {
        mockedUsersRepository.findOneByUsername.mockImplementation((username: string) => {
          if (username == testParameters.username) return new User({ username: username });
          else throw new Error('User does not exists');
        });
        mockedUsersRepository.update.mockImplementation(
          (username: string, payload: UpdateUserDto) => {
            this.users = this.user.map((user) => {
              if (user.username === username) {
                return Object.assign(user, payload);
              }
              return user;
            });
          },
        );
        it('Should modify only the displayName of the user', async () => {
          const queryGet = new GetUserByUsernameQuery(testParameters.username);
          let user = await getUserHandler.execute(queryGet);
          expect(user.username).toEqual(testParameters.username);

          const commandUpdate = new UpdateUserCommand(
            testParameters.username,
            testParameters.updateUserPayload,
          );
          await expect(updateUserHandler.execute(commandUpdate)).resolves.toEqual(undefined);

          user = await getUserHandler.execute(queryGet);
          expect(user.username).toEqual(testParameters.username);
          expect(user.displayName).toEqual(testParameters.updateUserPayload.displayName);
        });
        it('Should modify nothing', async () => {
          const queryGet = new GetUserByUsernameQuery(testParameters.username);
          let user = await getUserHandler.execute(queryGet);
          expect(user.username).toEqual(testParameters.username);
          const userDisplayName: string = user.displayName;
          const updateUserPayload: UpdateUserDto = { displayName: null };

          const commandUpdate = new UpdateUserCommand(testParameters.username, updateUserPayload);
          await expect(updateUserHandler.execute(commandUpdate)).resolves.toEqual(undefined);

          user = await getUserHandler.execute(queryGet);
          expect(user.username).toEqual(testParameters.username);
          expect(user.displayName).toEqual(userDisplayName);
        });
      });
    });
    it('Should modify nothing and create nothing', async () => {
      const usernameTest = 'I_DO_NOT_EXIST';
      const displayName = 'none';
      const queryGet = new GetUserByUsernameQuery(usernameTest);
      const user = await getUserHandler.execute(queryGet);
      expect(user).toBeUndefined();

      const commandUpdate = new UpdateUserCommand(usernameTest, { displayName: displayName });
      await expect(updateUserHandler.execute(commandUpdate)).rejects.toThrow(
        new Error('User does not exist'),
      );
    });
  });
});
