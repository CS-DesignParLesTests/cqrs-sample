import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../implements';
import { UsersRepository } from '../../repositories/users-repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const existingUser = await this.usersRepository.findOneByUsername(command.username);
    if (!existingUser) throw new Error('User does not exist');
    else return this.usersRepository.update(command.username, command.payload);
  }
}
