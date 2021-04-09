/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';

import { BookRepository } from '../../repository/book-repository';
import { GetBookHandler } from './get-book.handler';
import { GetBookQuery } from '../implements/get-book.query';
import { CreateBookDto } from '../../dto/create-book.dto';
import { Book } from '../../entities/book.entity';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';

export class BookRepositoryMock extends BookRepository {
  book = new Book({ id: '18', title: 'test_title', author: 'test_author' });
  books = [this.book];
  async create(id: string, payload: CreateBookDto): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  async findOneById(id: string): Promise<Book> {
    return this.books.find((book) => book.id === id);
  }
  async findAll(): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, payload: UpdateBookDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

describe('CreateBookCommandHandler', () => {
  let getBookCommandHandler: GetBookHandler;

  beforeEach(async () => {
    const bookRepositoryProvider: Provider[] = [
      {
        provide: BookRepository,
        useClass: BookRepositoryMock,
      },
      GetBookHandler,
    ];

    const providers: Provider[] = bookRepositoryProvider;

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    getBookCommandHandler = testModule.get(GetBookHandler);
  });

  describe('execute', () => {
    it('Should find an existing book', async () => {
      const command = new GetBookQuery('18');
      const book = await getBookCommandHandler.execute(command);
      expect(book.author).toEqual('test_author');
      expect(book.title).toEqual('test_title');
    });
    it('Should not find a non existing boo', async () => {
      const command = new GetBookQuery('5');
      const book = await getBookCommandHandler.execute(command);
      expect(book).toBeUndefined();
    });
  });
});
