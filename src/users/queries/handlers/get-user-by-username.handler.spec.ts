import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { mocked } from 'ts-jest/utils';
import { UsersRepositoryMemoryAdapter } from '../../repositories/users-repository-memory.adapter';
import { GetUserByUsernameHandler } from './get-user-by-username.handler';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../entities/user.entity';

//Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/users-repository-memory.adapter');
const MockedUsersRepository = UsersRepositoryMemoryAdapter;

describe(' ', () => {
  let getUserByUsernameHandler: GetUserByUsernameHandler;
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
      GetUserByUsernameHandler,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    //get and save the mock instance in order to apply assertions on it later
    mockedUsersRepository = mocked(MockedUsersRepository).mock.instances[0];
    //Mock the findOneByUsername method to be a function that returns the user thanks to the given username
    mockedUsersRepository.findOneByUsername.mockImplementation((username: string) => {
      return {
        username: username,
        displayName: 'yoloTest',
      };
    });
    getUserByUsernameHandler = testModule.get(GetUserByUsernameHandler);
  });
  describe('execute', function () {
    describe.each([
      { username: 'AmineI', displayName: 'Amine A.' },
      { username: 'candylol', displayName: 'Candice' },
      { username: 'àéùô', displayName: 'Un utilisateur qui aime les accents àéùi' },
    ])('with a query that is the username of the user we want to get', (user: User) => {
      beforeEach(() => {
        mockedUsersRepository.findOneByUsername.mockImplementation(async (username: string) => {
          return username == user.username ? user : undefined;
        });
      });
      it('should return the correct user', async () => {
        const gotUser: User = await getUserByUsernameHandler.execute({ username: user.username });

        expect(mockedUsersRepository.findOneByUsername).toHaveBeenNthCalledWith(
          1,
          expect.stringContaining(user.username),
        );
        expect(gotUser).toEqual(user);
      });
    });

    it('should return undefined if the user does not exist', async () => {
      mockedUsersRepository.findOneByUsername.mockImplementation(async (username: string) => {
        return username == 'doesExist' ? new User({ username: 'I_exist' }) : undefined;
      });
      const username = 'unknown user';
      const gotUser: User = await getUserByUsernameHandler.execute({
        username: username,
      });

      expect(mockedUsersRepository.findOneByUsername).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining(username),
      );
      expect(gotUser).toEqual(undefined);
    });
  });
});
