import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../implements';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const userToCreate = new User(command.payload);
    const existingUser = await this.usersRepository.findOneByUsername(userToCreate.username);
    if (existingUser) throw new Error('User already exists');
    else return await this.usersRepository.create(userToCreate);
  }
}
