import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookOwnershipCommand } from '../implements';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';

@CommandHandler(DeleteBookOwnershipCommand)
export class DeleteBookOwnershipHandler implements ICommandHandler<DeleteBookOwnershipCommand> {
  constructor(private bookOwnershipsRepository: BookOwnershipsRepository) {}

  async execute(command: DeleteBookOwnershipCommand): Promise<void> {
    const existingBookOwnership = await this.bookOwnershipsRepository.findOneByUsernameAndId(
      command.username,
      command.bookId,
    );
    if (!existingBookOwnership) throw new Error('BookOwnership does not exist');
    else return this.bookOwnershipsRepository.delete(command.username, command.bookId);
  }
}
