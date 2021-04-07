import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';

export abstract class BookRepository {
  abstract findOneById(id: string): Promise<Book>;
  abstract findAll(): Promise<Book[]>;

  abstract create(id: string, payload: CreateBookDto): Promise<Book>;
  abstract delete(id: string): Promise<void>;
}
