import { BookOwnership } from '../entities/book-ownership.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BookOwnershipsRepository {
  abstract findOneByUsernameAndId(
    username: string,
    bookId: string,
  ): Promise<BookOwnership | undefined>;

  abstract findAllByUsername(username: string): Promise<BookOwnership[]>;

  abstract create(bookOwnership: BookOwnership): Promise<BookOwnership>;

  abstract update(bookOwnership: BookOwnership): Promise<BookOwnership>;

  abstract delete(username: string, bookId: string): Promise<void>;
}
