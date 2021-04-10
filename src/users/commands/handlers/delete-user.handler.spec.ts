import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { mocked } from 'ts-jest/utils';
import { UsersRepositoryMemoryAdapter } from '../../repositories/memory/users-repository-memory.adapter';
import { UsersRepository } from '../../repositories/users-repository';
import { DeleteUserHandler } from './delete-user.handler';
import { DeleteUserCommand } from '../implements';
import { User } from '../../entities/user.entity';

// Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/users-repository-memory.adapter');
const MockedUsersRepository = UsersRepositoryMemoryAdapter;

describe('DeleteUserHandler', () => {
  let deleteUserHandler: DeleteUserHandler;
  let mockedUsersRepository;
  beforeEach(async () => {
    // Reset the mock instances
    mocked(MockedUsersRepository).mockClear();
    // Provide the Mocked class as a provider for the test module
    const providers: Provider[] = [
      {
        provide: UsersRepository,
        useClass: MockedUsersRepository,
      },
      DeleteUserHandler,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    // get and save the mock instance in order to apply assertions on it later
    mockedUsersRepository = mocked(MockedUsersRepository).mock.instances[0];
    // Mock the create method to to be a function that returns the passed user

    deleteUserHandler = testModule.get(DeleteUserHandler);
  });
  describe('execute', function () {
    describe.each([
      {
        exists: 'candylol',
        doesNotExist: 'AmineI',
      },
    ])('with a payload containing username & displayName', (testParameters) => {
      beforeEach(() => {
        mockedUsersRepository.findOneByUsername.mockImplementation((username: string) => {
          if (username == testParameters.exists) return new User({ username: username });
          else throw new Error('User does not exists');
        });
      });
      it('should call the remove method on the repository for the correct User', async () => {
        const command = new DeleteUserCommand(testParameters.exists);
        await deleteUserHandler.execute(command);
        expect(mockedUsersRepository.delete).toHaveBeenCalledWith(testParameters.exists);
      });
      it('should throw an error if the user did not already exist', async () => {
        const command = new DeleteUserCommand(testParameters.doesNotExist);
        await expect(deleteUserHandler.execute(command)).rejects.toThrow('User does not exist');
      });
      it('should not call the repository delete method if the user did not already exist', async () => {
        const command = new DeleteUserCommand(testParameters.doesNotExist);
        await expect(deleteUserHandler.execute(command)).rejects.toThrow('User does not exist');
        expect(mockedUsersRepository.delete).toHaveBeenCalledTimes(0);
      });
    });
  });
});
