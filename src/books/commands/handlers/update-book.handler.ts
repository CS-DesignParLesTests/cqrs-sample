import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCommand } from '../implements/update-book.command';
import { BooksRepository } from '../../repository/book-repository';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(private bookRepository: BooksRepository) {}

  async execute(command: UpdateBookCommand): Promise<void> {
    this.bookRepository.update(command.id, command.payload);
  }
}
