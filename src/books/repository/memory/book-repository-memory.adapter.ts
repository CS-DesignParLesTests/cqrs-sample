import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../../dto/create-book.dto';
import { BooksRepository } from '../book-repository';
import { Book } from '../../entities/book.entity';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';

@Injectable()
export class BookRepositoryMemoryAdapter extends BooksRepository {
  private books = [];

  async findOneById(id: number): Promise<Book> {
    return this.books.find((book) => book.id === id);
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async create(id: number, payload: CreateBookDto): Promise<Book> {
    const newBook = new Book({ id, ...payload });
    this.books.push(newBook);
    return newBook;
  }

  async delete(id: number): Promise<void> {
    this.books = this.books.filter((book) => id !== book.id);
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
