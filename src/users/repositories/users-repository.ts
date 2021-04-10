import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export abstract class UsersRepository {
  abstract findOneByUsername(username: string): Promise<User | undefined>;

  abstract findAll(): Promise<User[]>;

  abstract create(user: User): Promise<User>;

  abstract update(username: string, payload: UpdateUserDto): Promise<void>;

  abstract delete(username: string): Promise<void>;
}
