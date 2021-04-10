import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

export abstract class BooksRepository {
  abstract findOneById(id: number): Promise<Book>;
  abstract findAll(): Promise<Book[]>;

  abstract create(id: number, payload: CreateBookDto): Promise<Book>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, payload: UpdateBookDto): Promise<void>;
}
