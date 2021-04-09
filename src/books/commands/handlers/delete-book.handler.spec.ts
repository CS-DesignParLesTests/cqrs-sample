/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';

import { BookRepository } from '../../repository/book-repository';
import { DeleteBookHandler } from './delete-book.handler';
import { DeleteBookCommand } from '../implements/delete-book.command';
import { Book } from '../../entities/book.entity';
import { CreateBookDto } from '../../dto/create-book.dto';
import { GetBookHandler } from '../../queries/handlers/get-book.handler';
import { GetBookQuery } from '../../queries/implements/get-book.query';

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
    this.books = this.books.filter((book) => id !== book.id);
  }
}

describe('DeleteBookCommandHandler', () => {
  let deleteBookHandler: DeleteBookHandler;
  let getBookHandler: GetBookHandler;

  beforeEach(async () => {
    const bookRepositoryProvider: Provider[] = [
      {
        provide: BookRepository,
        useClass: BookRepositoryMock,
      },
      DeleteBookHandler,
      GetBookHandler,
    ];

    const providers: Provider[] = bookRepositoryProvider;

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    deleteBookHandler = testModule.get(DeleteBookHandler);
    getBookHandler = testModule.get(GetBookHandler);
  });

  describe('execute', () => {
    it('Should delete a book', async () => {
      const queryGet = new GetBookQuery('18');
      let book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('test_title');

      const commandDelete = new DeleteBookCommand('18');
      await expect(deleteBookHandler.execute(commandDelete)).resolves.toEqual(undefined);
      book = await getBookHandler.execute(queryGet);
      expect(book).toBeUndefined();
    });
  });
});
