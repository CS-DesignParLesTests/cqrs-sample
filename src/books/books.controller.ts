import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookCommand } from './commands/implements/create.book';
import { DeleteBookCommand } from './commands/implements/delete.book';
import { ListBooksQuery } from './queries/implements/list.books';
import { GetBookQuery } from './queries/implements/get.book';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Book Details')
@Controller('books')
export class BooksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.commandBus.execute(new CreateBookCommand(createBookDto));
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The resource has been fetched and is transmitted in the message body.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.queryBus.execute(new ListBooksQuery());
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The resource has been fetched and is transmitted in the message body.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetBookQuery(id));
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The resource has been deleted.' })
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteBookCommand(id));
  }
}
