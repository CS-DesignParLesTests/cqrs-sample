import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  public username: string;
  public displayName: string;

  constructor({ username, displayName = username }) {
    //If not provided, the display name will be replaced with a username
    super();
    this.username = username;
    this.displayName = displayName;
  }
}
