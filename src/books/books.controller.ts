import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@ApiTags('Books Details')
@Controller('books')
@ApiExtraModels(Book)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The resource has been fetched and is transmitted in the message body.',
    schema: { $ref: '#/components/schemas/Book' },
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request. BookID must be a string to uuid format.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  findOne(@Param('id') id: string) {
    return this.booksService.find(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of Book objects.',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Book',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'There is no book.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  findAll() {
    return this.booksService.findAll();
  }

  @Post()
  @ApiResponse({ status: 200, description: 'The book has been successfully updated.' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Book ID must be a string to uuid format.',
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'A Book with the specified ID was not found.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The book has been successfully updated.' })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'A book with the specified ID was not found.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The book has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'A Book with the specified ID was not found.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
