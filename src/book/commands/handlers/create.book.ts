import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCommand } from '../implements/create.book';
import { BookRepository } from '../../repository/book-repository';
import { v4 as uuidv4 } from 'uuid';
import { Book } from 'src/book/entities/book.entity';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private bookRepository: BookRepository) {}

  async execute(command: CreateBookCommand): Promise<Book> {
    const id = uuidv4();
    return this.bookRepository.create(id, command.payload);
  }
}
