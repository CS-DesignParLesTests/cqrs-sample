import { BookOwnership } from '../entities/book-ownership.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BookOwnershipsRepository {
  abstract findOneByUsernameAndId(
    username: string,
    bookId: string,
  ): Promise<BookOwnership | undefined>;

  abstract findAllByUsername(username: string): Promise<BookOwnership[]>;

  abstract create(username: string, bookOwnership: BookOwnership): Promise<BookOwnership>;

  abstract update(username: string, bookOwnership: BookOwnership): Promise<BookOwnership>;

  abstract delete(username: string, bookId: string): Promise<void>;
}
