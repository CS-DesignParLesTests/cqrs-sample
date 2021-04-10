import { UsersRepository } from './../users-repository';
import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UsersRepositoryMemoryAdapter extends UsersRepository {
  private users = [];

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user: User) => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(username: string, payload: UpdateUserDto): Promise<void> {
    this.users = this.users.map((user) => {
      if (user.username === username) {
        return Object.assign(user, payload);
      }
      return user;
    });
  }

  async delete(username: string): Promise<void> {
    this.users = this.users.filter((User) => username !== User.username);
  }
}
