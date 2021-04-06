import { UsersRepository } from './users-repository';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepositoryMemoryAdapter extends UsersRepository {
  async findOneByUsername(username: string): Promise<User> {
    throw Error('NotImplemented');
  }

  async findAll(): Promise<User[]> {
    throw Error('NotImplemented');
  }

  async create(payload: CreateUserDto): Promise<User> {
    throw Error('NotImplemented');
  }

  async update(payload: UpdateUserDto): Promise<User> {
    throw Error('NotImplemented');
    //return Promise.resolve(undefined);
  }

  async delete(username: string): Promise<void> {
    throw Error('NotImplemented');
  }
}
