import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from './users-repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepositoryTypeOrmAdapter extends UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne(username);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(username: string, user: User): Promise<User> {
    throw Error('NotImplemented');
  }

  async delete(username: string): Promise<void> {
    // this.users = this.users.filter((User) => username !== User.username);
    await this.usersRepository.delete(username);
  }
}
