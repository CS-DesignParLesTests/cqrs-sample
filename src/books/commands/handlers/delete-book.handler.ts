import { DeleteBookCommand } from '../implements/delete-book.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookRepository } from '../../repositories/book-repository';

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  constructor(private bookRepository: BookRepository) {}

  async execute(command: DeleteBookCommand): Promise<void> {
    this.bookRepository.delete(command.id);
  }
}
