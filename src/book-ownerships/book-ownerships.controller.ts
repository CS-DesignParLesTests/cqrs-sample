import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookOwnershipsService } from './book-ownerships.service';
import { CreateBookOwnershipDto } from './dto/create-book-ownership.dto';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookOwnership } from './entities/book-ownership.entity';

@ApiTags('User library')
@Controller('users/:username/books-owned')
@ApiExtraModels(BookOwnership)
export class BookOwnershipsController {
  constructor(private readonly bookOwnershipsService: BookOwnershipsService) {}

  @Get(':bookId')
  @ApiResponse({
    status: 200,
    description: 'A BookOwnership object.',
    schema: { $ref: '#/components/schemas/BookOwnership' },
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description:
      'Bad Request. A BookOwnership ID with the specified book ID was not found for the specified username. Book ID must be a string to uuid format and username must be a string.',
  })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  findOne(@Param('username') username: string, @Param('bookId') bookId: string) {
    return this.bookOwnershipsService.findOneByUsernameAndId(username, bookId);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of BookOwnership objects.',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/BookOwnership',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description: 'There is no bookOwnership associated to this username.',
  })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  findAll(@Param('username') username: string) {
    return this.bookOwnershipsService.findAllByUsername(username);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'The bookOwnership has been successfully updated.' })
  @ApiResponse({ status: 201, description: 'The bookOwnership has been successfully created.' })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request. A BookOwnership with the specified book ID was not found for the specified username. Book ID must be a string to uuid format and username must be a string.',
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description:
      'Bad Request. Book ID must be a string to uuid format and username must be a string.',
  })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  add(@Param('username') username: string, @Body() addBookOwnershipDto: CreateBookOwnershipDto) {
    return this.bookOwnershipsService.create(username, addBookOwnershipDto);
  }

  /*
  @Patch(':bookId')
  @ApiResponse({ status: 200, description: 'The bookOwnership has been successfully updated.' })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
   @ApiResponse({
    status: 404,
    description:
      'Bad Request. Book ID must be a string to uuid format and username must be a string.',
  })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  update(
    @Param('username') username: string,
    @Param('bookId') bookId: string,
    @Body() updateBookOwnershipDto: UpdateBookOwnershipDto,
  ) {
    return this.bookOwnershipsService.update(username, updateBookOwnershipDto);
  }*/

  @Delete(':bookId')
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description:
      'Bad Request. A BookOwnership with the specified book ID was not found for the specified username. Book ID must be a string to uuid format and username must be a string.',
  })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  remove(@Param('username') username: string, @Param('bookId') bookId: string) {
    return this.bookOwnershipsService.remove(username, bookId);
  }
}
