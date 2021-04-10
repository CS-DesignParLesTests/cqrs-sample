import { Book } from '../../books/entities/book.entity';
import { AggregateRoot } from '@nestjs/cqrs';

//TODO Implement BookInterface to apply decorator pattern ?
export class BookOwnership extends AggregateRoot {
  public username: string;
  public bookId: string;

  public isBought = true;
  public isSigned = false;
  public isLent = false;

  public dateAcquired: Date | undefined;
  public dateRead: Date | undefined;

  constructor(input) {
    // need to check if input is defined because TypeOrm call the constructor without parameters
    super();
    if (input === undefined) return;
    //TODO Store book instance instead ?
    ({
      username: this.username,
      bookId: this.bookId,
      bought: this.isBought,
      signed: this.isSigned,
      lent: this.isLent,
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
