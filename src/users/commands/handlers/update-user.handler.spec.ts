import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { mocked } from 'ts-jest/utils';
import { UsersRepositoryMemoryAdapter } from '../../repositories/memory/users-repository-memory.adapter';
import { UsersRepository } from '../../repositories/users-repository';
import { UpdateUserHandler } from './update-user.handler';
import { UpdateUserCommand } from '../implements';
import { User } from '../../entities/user.entity';

//Replace UsersRepositoryMemoryAdapter with a mocked class
jest.mock('../../repositories/users-repository-memory.adapter');
const MockedUsersRepository = UsersRepositoryMemoryAdapter;

describe('UpdateUserHandler', () => {
  let updateUserHandler: UpdateUserHandler;
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
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    //get and save the mock instance in order to apply assertions on it later
    mockedUsersRepository = mocked(MockedUsersRepository).mock.instances[0];
    //Mock the create method to to be a function that returns the passed user

    updateUserHandler = testModule.get(UpdateUserHandler);
  });
  //TODO tests
});
