import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookCommand } from './commands/implements/create.book';
import { DeleteBookCommand } from './commands/implements/delete.book';
import { ListBooksQuery } from './queries/implements/list.books';
import { GetBookQuery } from './queries/implements/get.book';

@Controller('book')
export class BooksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.commandBus.execute(new CreateBookCommand(createBookDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new ListBooksQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetBookQuery(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteBookCommand(id));
  }
}
