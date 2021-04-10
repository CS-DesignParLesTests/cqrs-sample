import { Book } from '../../entities/book.entity';
import { GetBooksQuery } from '../implements/get-books.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookRepository } from '../../repositories/book-repository';

@QueryHandler(GetBooksQuery)
export class GetBooksHandler implements IQueryHandler<GetBooksQuery> {
  constructor(private bookRepository: BookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }
}
