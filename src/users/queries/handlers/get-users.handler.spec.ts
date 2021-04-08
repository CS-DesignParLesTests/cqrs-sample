/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../entities/user.entity';
import { GetUsersQuery } from '../implements';
import { GetUsersHandler } from './get-users.handler';
import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';

class UsersRepositoryMock extends UsersRepository {
  user1 = new User({ username: 'candylol', displayName: 'Candice' });
  user2 = new User({ username: 'AmineI', displayName: 'Amine' });
  users = [this.user1, this.user2];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(username: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOneByUsername(username: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  update(username: string, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

describe('GetUsersHandler', () => {
  let listUsersQueryHandler: GetUsersHandler;

  beforeAll(async () => {
    const usersRepositoryProvider: Provider[] = [
      {
        provide: UsersRepository,
        useClass: UsersRepositoryMock,
      },
      GetUsersHandler,
    ];
    const providers: Provider[] = usersRepositoryProvider;

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    listUsersQueryHandler = testModule.get(GetUsersHandler);
  });

  describe('execute', () => {
    it('should return Users with their correct username and displayname', async () => {
      const users = await listUsersQueryHandler.execute(new GetUsersQuery());
      expect(users[0].username).toEqual('candylol');
      expect(users[0].displayName).toEqual('Candice');

      expect(users[1].username).toEqual('AmineI');
      expect(users[1].displayName).toEqual('Amine');
    });

    it.each([
      [new User({ username: 'candylol', displayName: 'Candice' }), 0],
      [new User({ username: 'AmineI', displayName: 'Amine' }), 1],
    ])('should return Users with their correct values', async (expectedUser, i) => {
      const users = await listUsersQueryHandler.execute(new GetUsersQuery());
      expect(users[i]).toEqual(expectedUser);
    });

    it('should return the right number of users', async () => {
      const users = await listUsersQueryHandler.execute(new GetUsersQuery());
      expect(users.length).toEqual(2);
    });
  });
});
