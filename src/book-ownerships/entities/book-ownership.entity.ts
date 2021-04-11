import { AggregateRoot } from '@nestjs/cqrs';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';

//TODO Implement BookInterface to apply decorator pattern and store the book instance ?
@Entity()
export class BookOwnership extends AggregateRoot {
  @Exclude()
  public username: string;

  @ApiProperty({
    required: true,
    description: 'The unique ID of the book',
    type: 'string',
    format: 'uuid',
  })
  public bookId: string;

  @ApiProperty({
    description: 'Indicates whether the book has been bought or not by the user',
    type: 'boolean',
  })
  public isBought: boolean;
  @ApiProperty({
    description: `Indicates whether the user's book has been signed or not`,
    type: 'boolean',
  })
  public isSigned: boolean;
  @ApiProperty({
    description: `Indicates whether the user's book is lent or not`,
    type: 'boolean',
  })
  public isLent: boolean;

  @ApiProperty({
    description: `Indicates the acquisition date of the book by the user`,
    type: 'string',
    format: 'date-time',
  })
  public dateAcquired: Date | undefined;
  @ApiProperty({
    description: `Indicates the read date of the book by the user`,
    type: 'string',
    format: 'date-time',
  })
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
