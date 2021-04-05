import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(public username: string) {
    super();
  }
}
