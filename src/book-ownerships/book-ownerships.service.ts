import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookOwnershipDto } from './dto/create-book-ownership.dto';
import { CreateBookOwnershipCommand, DeleteBookOwnershipCommand } from './commands/implements';
import {
  GetBookOwnershipByUserAndIdQuery,
  GetBookOwnershipByUserQuery,
} from './queries/implements';

@Injectable()
export class BookOwnershipsService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  create(username: string, createBookOwnershipDto: CreateBookOwnershipDto) {
    return this.commandBus.execute(
      new CreateBookOwnershipCommand(username, createBookOwnershipDto),
    );
  }

  findAllByUsername(username: string) {
    return this.queryBus.execute(new GetBookOwnershipByUserQuery(username));
  }

  findOneByUsernameAndId(username: string, bookId: string) {
    return this.queryBus.execute(new GetBookOwnershipByUserAndIdQuery(username, bookId));
  }

  /* TODO
  update(username: string, bookId: string, updateBookOwnershipDto: UpdateBookOwnershipDto) {
    return `This action updates a #${bookId} bookOwnership`;
  }
*/
  remove(username: string, bookId: string) {
    return this.commandBus.execute(new DeleteBookOwnershipCommand(username, bookId));
  }
}
