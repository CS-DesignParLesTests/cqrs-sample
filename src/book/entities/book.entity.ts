import { AggregateRoot } from '@nestjs/cqrs';

export class Book extends AggregateRoot {
  constructor(public id: string, public title: string, public author: string) {
    super();
  }
}
