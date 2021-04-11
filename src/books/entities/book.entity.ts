import { AggregateRoot } from '@nestjs/cqrs';
import { BookInterface } from '../interfaces/book.interface';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book extends AggregateRoot implements BookInterface {
  @PrimaryColumn()
  @ApiProperty({
    required: true,
    description: 'The ID of the book',
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @Column()
  @ApiProperty({
    required: true,
    description: 'The title of the book',
    type: 'string',
  })
  title: string;

  @Column()
  @ApiProperty({
    required: true,
    description: 'The author of the book',
    type: 'string',
  })
  author: string;

  constructor(input) {
    // need to check if input is defined because TypeOrm call the constructor without parameters
    super();
    if (input === undefined) {
      return;
    }
    const { id, title, author } = input;
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
