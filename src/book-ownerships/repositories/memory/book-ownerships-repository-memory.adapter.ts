import { BookOwnershipsRepository } from '../book-ownerships-repository';
import { BookOwnership } from '../../entities/book-ownership.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookOwnershipsRepositoryMemoryAdapter extends BookOwnershipsRepository {
  private bookOwnerships: BookOwnership[] = [];

  async findOneByUsernameAndId(
    username: string,
    bookId: string,
  ): Promise<BookOwnership | undefined> {
    return this.bookOwnerships.find((bookOwnership) => {
      return bookOwnership.username === username && bookOwnership.bookId === bookId;
    });
  }

  async findAllByUsername(username: string): Promise<BookOwnership[]> {
    return this.bookOwnerships.filter((bookOwnership) => bookOwnership.username === username);
  }

  async create(bookOwnership: BookOwnership): Promise<BookOwnership> {
    this.bookOwnerships.push(bookOwnership);
    return bookOwnership;
  }

  async update(bookOwnership: BookOwnership): Promise<BookOwnership> {
    throw Error('NotImplemented');
    //TODO
    return Promise.resolve(undefined);
  }

  async delete(username: string, bookId: string): Promise<void> {
    this.bookOwnerships = this.bookOwnerships.filter((bookOwnership) => {
      return username !== bookOwnership.username || bookId !== bookOwnership.bookId;
    });
  }
}
