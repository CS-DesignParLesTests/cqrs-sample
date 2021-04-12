import { BookOwnership } from '../entities/book-ownership.entity';
import { Injectable } from '@nestjs/common';
import { UpdateBookOwnershipDto } from '../dto/update-book-ownership.dto';

@Injectable()
export abstract class BookOwnershipsRepository {
  abstract findOneByUsernameAndId(
    username: string,
    bookId: string,
  ): Promise<BookOwnership | undefined>;

  abstract findAllByUsername(username: string): Promise<BookOwnership[]>;

  abstract create(bookOwnership: BookOwnership): Promise<BookOwnership>;

  abstract update(username: string, bookId: string, payload: UpdateBookOwnershipDto): Promise<void>;

  abstract delete(username: string, bookId: string): Promise<void>;
}
