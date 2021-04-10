/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';

import { BooksRepository } from '../../repository/book-repository';
import { Book } from '../../entities/book.entity';
import { CreateBookDto } from '../../dto/create-book.dto';
import { GetBookHandler } from '../../queries/handlers/get-book.handler';
import { GetBookQuery } from '../../queries/implements/get-book.query';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { UpdateBookHandler } from './update-book.handler';
import { UpdateBookCommand } from '../implements/update-book.command';

class BookRepositoryMock extends BooksRepository {
  book = new Book({ id: '18', title: 'test title', author: 'test author' });
  books = [
    this.book,
    Object.assign({}, this.book, { id: '19' }),
    Object.assign({}, this.book, { id: '20' }),
    Object.assign({}, this.book, { id: '21' }),
  ];
  async create(id: number, payload: CreateBookDto): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  async findOneById(id: number): Promise<Book> {
    return this.books.find((book) => book.id === id);
  }
  async findAll(): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(id: number, payload: UpdateBookDto): Promise<void> {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return Object.assign(book, payload);
      }
      return book;
    });
  }
}

describe('UpdateBookCommandHandler', () => {
  let getBookHandler: GetBookHandler;
  let updateBookHandler: UpdateBookHandler;

  beforeEach(async () => {
    const bookRepositoryProvider: Provider[] = [
      {
        provide: BooksRepository,
        useClass: BookRepositoryMock,
      },
      GetBookHandler,
      UpdateBookHandler,
    ];

    const providers: Provider[] = bookRepositoryProvider;

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    updateBookHandler = testModule.get(UpdateBookHandler);
    getBookHandler = testModule.get(GetBookHandler);
  });

  describe('execute', () => {
    it('Should modify nothing', async () => {
      const queryGet = new GetBookQuery('21');
      let book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('test title');
      expect(book.author).toEqual('test author');

      const commandUpdate = new UpdateBookCommand('23', {});
      await expect(updateBookHandler.execute(commandUpdate)).resolves.toEqual(undefined);

      book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('test title');
      expect(book.author).toEqual('test author');
    });
    it('Should modify only the author of the book', async () => {
      const queryGet = new GetBookQuery('18');
      let book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('test title');
      expect(book.author).toEqual('test author');

      const commandUpdate = new UpdateBookCommand('18', {
        author: 'modified author',
      });
      await expect(updateBookHandler.execute(commandUpdate)).resolves.toEqual(undefined);

      book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('test title');
      expect(book.author).toEqual('modified author');
    });
    it('Should modify only the title of the book', async () => {
      const queryGet = new GetBookQuery('19');
      let book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('test title');
      expect(book.author).toEqual('test author');

      const commandUpdate = new UpdateBookCommand('19', {
        title: 'modified title',
      });
      await expect(updateBookHandler.execute(commandUpdate)).resolves.toEqual(undefined);

      book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('modified title');
      expect(book.author).toEqual('test author');
    });
    it('Should modify both, author and title of the book', async () => {
      const queryGet = new GetBookQuery('20');
      let book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('test title');
      expect(book.author).toEqual('test author');

      const commandUpdate = new UpdateBookCommand('20', {
        title: 'modified title',
        author: 'modified author',
      });
      await expect(updateBookHandler.execute(commandUpdate)).resolves.toEqual(undefined);

      book = await getBookHandler.execute(queryGet);
      expect(book.title).toEqual('modified title');
      expect(book.author).toEqual('modified author');
    });
  });
});
