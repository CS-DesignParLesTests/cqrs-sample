import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCommand } from '../implements/update-book.command';
import { BookRepository } from '../../repositories/book-repository';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(private bookRepository: BookRepository) {}

  async execute(command: UpdateBookCommand): Promise<void> {
    this.bookRepository.update(command.id, command.payload);
  }
}
