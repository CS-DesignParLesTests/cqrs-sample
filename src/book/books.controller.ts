import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('book')
export class BooksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
}
