import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { UpdateBookOwnershipCommand } from '../implements/update-book-ownership.command';

@CommandHandler(UpdateBookOwnershipCommand)
export class UpdateBookOwnershipHandler implements ICommandHandler<UpdateBookOwnershipCommand> {
  constructor(private bookOwnershipsRepository: BookOwnershipsRepository) {}

  async execute(command: UpdateBookOwnershipCommand): Promise<void> {
    const existingBookOwnership = await this.bookOwnershipsRepository.findOneByUsernameAndId(
      command.username,
      command.bookId,
    );
    if (!existingBookOwnership) throw new Error('BookOwnership does not exist');
    else
      return this.bookOwnershipsRepository.update(
        command.username,
        command.bookId,
        command.payload,
      );
  }
}
