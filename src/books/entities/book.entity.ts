import { AggregateRoot } from '@nestjs/cqrs';
import { BookInterface } from '../interfaces/book.interface';

export class Book extends AggregateRoot implements BookInterface {
  id: string;

  title: string;

  author: string;

  constructor({ id, title, author }) {
    super();
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
