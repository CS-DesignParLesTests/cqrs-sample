import { AggregateRoot } from '@nestjs/cqrs';
import { BookInterface } from '../interfaces/book.interface';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Book extends AggregateRoot implements BookInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  constructor({ id, title, author }) {
    super();
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
