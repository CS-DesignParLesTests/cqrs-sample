import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Book } from './entities/book.entity';
import { GetBooksQuery } from './queries/implements/get-books.query';
import { GetBookQuery } from './queries/implements/get-book.query';
import { CreateBookCommand } from './commands/implements/create-book.command';
import { DeleteBookCommand } from './commands/implements/delete-book.command';

@Injectable()
export class BooksService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async create(createUserDto: CreateBookDto) {
    return this.commandBus.execute(new CreateBookCommand(createUserDto));
  }

  async findAll(): Promise<Book[]> {
    return this.queryBus.execute(new GetBooksQuery());
  }

  async find(id: string) {
    return await this.queryBus.execute(new GetBookQuery(id));
  }

  async remove(id: string) {
    return this.commandBus.execute(new DeleteBookCommand(id));
  }
}
