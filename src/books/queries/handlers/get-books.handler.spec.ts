/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';

import { BooksRepository } from '../../repository/book-repository';
import { CreateBookDto } from '../../dto/create-book.dto';
import { Book } from '../../entities/book.entity';
import { GetBooksHandler } from './get-books.handler';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';

export class BookRepositoryMock extends BooksRepository {
  book = new Book({ id: 18, title: 'test_title', author: 'test_author' });
  books = [this.book];
  async create(id: number, payload: CreateBookDto): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  async findOneById(id: number): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Book[]> {
    return this.books;
  }
  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(id: number, payload: UpdateBookDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

describe('ListBookHandler', () => {
  let getBooksQueryHandler: GetBooksHandler;

  beforeEach(async () => {
    const bookRepositoryProvider: Provider[] = [
      {
        provide: BooksRepository,
        useClass: BookRepositoryMock,
      },
      GetBooksHandler,
    ];

    const providers: Provider[] = bookRepositoryProvider;

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    getBooksQueryHandler = testModule.get(GetBooksHandler);
  });

  describe('execute', () => {
    it('Should return Promise<Book[]> with the correct content', async () => {
      const books = await getBooksQueryHandler.execute();
      expect(books[0].title).toEqual('test_title');
      expect(books[0].author).toEqual('test_author');
    });
  });
});
