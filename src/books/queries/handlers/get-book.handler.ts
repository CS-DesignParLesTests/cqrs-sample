import { Book } from '../../entities/book.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookQuery } from '../implements/get-book.query';
import { BooksRepository } from '../../repository/book-repository';

@QueryHandler(GetBookQuery)
export class GetBookHandler implements IQueryHandler<GetBookQuery> {
  constructor(private bookRepository: BooksRepository) {}

  async execute(query: GetBookQuery): Promise<Book> {
    return this.bookRepository.findOneById(query.id);
  }
}
