import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from './entities/user.entity';
import { GetUserByUsernameQuery, GetUsersQuery } from './queries/implements';
import { CreateUserCommand, DeleteUserCommand, UpdateUserCommand } from './commands/implements';

@Injectable()
export class UsersService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async create(createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  async findAll(): Promise<User[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  async findByUsername(username: string) {
    return await this.queryBus.execute(new GetUserByUsernameQuery(username));
  }

  async remove(username: string) {
    return this.commandBus.execute(new DeleteUserCommand(username));
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateUserCommand(username, updateUserDto));
  }
}
