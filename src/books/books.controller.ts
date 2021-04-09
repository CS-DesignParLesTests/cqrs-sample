import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';

@ApiTags('Books Details')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The resource has been fetched and is transmitted in the message body.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The resource has been fetched and is transmitted in the message body.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.booksService.find(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The resource has been deleted.' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
