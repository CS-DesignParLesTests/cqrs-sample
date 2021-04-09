import { Book } from '../../books/entities/book.entity';

//TODO Implement BookInterface to apply decorator pattern ?
export class BookOwnership {
  public username: string;
  public bookId: string;

  public bought = true;
  public signed = false;
  public lent = false;

  public dateAcquired: Date | undefined;
  public dateRead: Date | undefined;

  constructor({ username, bookId }) {
    this.username = username;
    //TODO Store book instance instead ?
    this.bookId = bookId;
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
