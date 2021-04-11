import { AggregateRoot } from '@nestjs/cqrs';
import { Exclude } from 'class-transformer';

//TODO Implement BookInterface to apply decorator pattern and store the book instance ?
export class BookOwnership extends AggregateRoot {
  @Exclude()
  public username: string;

  public bookId: string;

  public isBought: boolean;
  public isSigned: boolean;
  public isLent: boolean;

  public dateAcquired: Date | undefined;
  public dateRead: Date | undefined;

  constructor(input) {
    super();
    // need to check if input is defined because TypeOrm call the constructor without parameters
    if (input === undefined) return;
    ({
      username: this.username,
      bookId: this.bookId,
      isBought: this.isBought,
      isSigned: this.isSigned,
      isLent: this.isLent,
      dateAcquired: this.dateAcquired,
      dateRead: this.dateRead,
    } = input);

    if (!this.username || !this.bookId) {
      throw new Error('Missing username or bookId');
    }
  }

  /*
  // TODO Expose the original book details through the associated book instance
  @Expose({ name: 'bookId' })
  get id() {
    return this.book.id;
  }

  @Expose({ name: 'bookTitle' })
  get title() {
    return this.book.title;
  }

  @Expose({ name: 'bookAuthor' })
  get author() {
    return this.book.author;
  }
   */
}
