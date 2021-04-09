/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';

import { BookRepository } from '../../repository/book-repository';
import { CreateBookDto } from '../../dto/create-book.dto';
import { Book } from '../../entities/book.entity';
import { GetBooksHandler } from './get-books.handler';

export class BookRepositoryMock extends BookRepository {
  book = new Book({ id: '18', title: 'test_title', author: 'test_author' });
  books = [this.book];
  async create(id: string, payload: CreateBookDto): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  async findOneById(id: string): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Book[]> {
    return this.books;
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

describe('ListBookHandler', () => {
  let listBooksQueryHandler: GetBooksHandler;

  beforeEach(async () => {
    const bookRepositoryProvider: Provider[] = [
      {
        provide: BookRepository,
        useClass: BookRepositoryMock,
      },
      GetBooksHandler,
    ];

    const providers: Provider[] = bookRepositoryProvider;

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    listBooksQueryHandler = testModule.get(GetBooksHandler);
  });

  describe('execute', () => {
    it('Should return Promise<Book[]> with the correct content', async () => {
      const books = await listBooksQueryHandler.execute();
      expect(books[0].title).toEqual('test_title');
      expect(books[0].author).toEqual('test_author');
    });
  });
});
