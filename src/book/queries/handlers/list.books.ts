import { Book } from 'src/book/entities/book.entity';
import { ListBooksQuery } from '../implements/list.books';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookRepository } from '../../repository/book-repository';

@QueryHandler(ListBooksQuery)
export class ListBooksHandler implements IQueryHandler<ListBooksQuery> {
  constructor(private bookRepository: BookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }
}
