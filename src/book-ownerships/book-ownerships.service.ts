import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookOwnershipDto } from './dto/create-book-ownership.dto';
import { CreateBookOwnershipCommand, DeleteBookOwnershipCommand } from './commands/implements';
import {
  GetBookOwnershipByUserAndIdQuery,
  GetBookOwnershipsByUserQuery,
} from './queries/implements';
import { UpdateBookOwnershipDto } from './dto/update-book-ownership.dto';
import { UpdateBookOwnershipCommand } from './commands/implements/update-book-ownership.command';

@Injectable()
export class BookOwnershipsService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  create(username: string, createBookOwnershipDto: CreateBookOwnershipDto) {
    return this.commandBus.execute(
      new CreateBookOwnershipCommand(username, createBookOwnershipDto),
    );
  }

  findAllByUsername(username: string) {
    return this.queryBus.execute(new GetBookOwnershipsByUserQuery(username));
  }

  findOneByUsernameAndId(username: string, bookId: string) {
    return this.queryBus.execute(new GetBookOwnershipByUserAndIdQuery(username, bookId));
  }

  update(username: string, bookId: string, payload: UpdateBookOwnershipDto) {
    return this.commandBus.execute(new UpdateBookOwnershipCommand(username, bookId, payload));
  }

  remove(username: string, bookId: string) {
    return this.commandBus.execute(new DeleteBookOwnershipCommand(username, bookId));
  }
}
