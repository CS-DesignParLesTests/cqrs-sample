import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export abstract class UsersRepository {
  abstract findOneByUsername(username: string): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract create(payload: CreateUserDto): Promise<User>;

  abstract update(payload: UpdateUserDto): Promise<User>;

  abstract delete(username: string): Promise<void>;
}
