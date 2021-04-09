/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';

import { CreateBookHandler } from './create-book.handler';
import { CreateBookCommand } from '../implements/create-book.command';
import { BookRepository } from '../../repository/book-repository';
import { Book } from '../../entities/book.entity';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';

class BookRepositoryMock extends BookRepository {
  async create(id: string, payload: CreateBookDto): Promise<Book> {
    const newBook = new Book({ id, ...payload });
    return newBook;
  }
  async findOneById(id: string): Promise<Book> {
    throw new Error('Method not implemented.');
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
  let createBookCommandHandler: CreateBookHandler;
  beforeEach(async () => {
    const bookRepositoryProvider: Provider[] = [
      {
        provide: BookRepository,
        useClass: BookRepositoryMock,
      },
      CreateBookHandler,
    ];

    const providers: Provider[] = bookRepositoryProvider;

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    createBookCommandHandler = testModule.get(CreateBookHandler);
  });

  describe('execute', () => {
    it('Should return created books with correct name and title', async () => {
      let command = new CreateBookCommand({
        author: 'test_author',
        title: 'test_title',
      });
      let book = await createBookCommandHandler.execute(command);
      expect(book.title).toEqual('test_title');
      expect(book.author).toEqual('test_author');

      command = new CreateBookCommand({
        author: 'test_author2',
        title: 'test_title2',
      });
      book = await createBookCommandHandler.execute(command);
      expect(book.author).toEqual('test_author2');
      expect(book.title).toEqual('test_title2');
    });
  });
});
