import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends AggregateRoot {
  @PrimaryColumn({ type: 'varchar', length: '30' })
  public username: string;

  @Column({ type: 'varchar', length: '30' })
  public displayName: string;

  constructor(input) {
    // If not provided, the display name will be replaced with a username
    // Need to check if input is defined because TypeOrm call the constructor without parameters
    super();
    if (input === undefined) {
      return;
    }
    const { username, displayName = username } = input;
    this.username = username;
    this.displayName = displayName;
  }
}
