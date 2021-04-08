import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../implements';
import { UsersRepository } from '../../repositories/users-repository';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const existingUser = await this.usersRepository.findOneByUsername(command.username);
    if (!existingUser) throw new Error('User does not exist');
    else return this.usersRepository.delete(command.username);
  }
}
