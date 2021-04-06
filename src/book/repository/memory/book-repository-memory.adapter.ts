import { CreateBookDto } from '../../dto/create-book.dto';
import { BookRepository } from '../book-repository';
import { Book } from '../../entities/book.entity';

export class BookRepositoryMemoryAdapter extends BookRepository {
  private books = [];

  async findOneById(id: string): Promise<Book> {
    return this.books.find((book) => book.id === id);
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async create(id: string, payload: CreateBookDto): Promise<Book> {
    const { title, author } = payload;
    const newBook = new Book(id, title, author);
    this.books.push(newBook);
    return newBook;
  }

  async delete(id: string): Promise<void> {
    this.books = this.books.filter((book) => id !== book.id);
  }
}