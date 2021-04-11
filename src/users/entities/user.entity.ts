import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends AggregateRoot {
  @PrimaryColumn({ type: 'varchar', length: '30' })
  @ApiProperty({
    required: true,
    description: 'The ID of a user',
    type: 'string',
    format: 'uuid',
  })
  @IsNotEmpty()
  public username: string;

  @Column({ type: 'varchar', length: '30' })
  @ApiProperty({
    description: 'The name displayed to other users',
    type: 'string',
  })
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
