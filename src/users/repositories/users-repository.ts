import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UsersRepository {
  abstract findOneByUsername(username: string): Promise<User | undefined>;

  abstract findAll(): Promise<User[]>;

  abstract create(user: User): Promise<User>;

  abstract update(username: string, user: User): Promise<User>;

  abstract delete(username: string): Promise<void>;
}
