import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { BookOwnershipsService } from './book-ownerships.service';
import { CreateBookOwnershipDto } from './dto/create-book-ownership.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateBookOwnershipDto } from './dto/update-book-ownership.dto';

@ApiTags('User library')
@Controller('users/:username/books-owned')
export class BookOwnershipsController {
  constructor(private readonly bookOwnershipsService: BookOwnershipsService) {}

  @Post()
  add(@Param('username') username: string, @Body() addBookOwnershipDto: CreateBookOwnershipDto) {
    return this.bookOwnershipsService.create(username, addBookOwnershipDto);
  }

  @Get()
  findAll(@Param('username') username: string) {
    return this.bookOwnershipsService.findAllByUsername(username);
  }

  @Get(':bookId')
  findOne(@Param('username') username: string, @Param('bookId') bookId: string) {
    return this.bookOwnershipsService.findOneByUsernameAndId(username, bookId);
  }

  @Patch(':bookId')
  update(
    @Param('username') username: string,
    @Param('bookId') bookId: string,
    @Body() updateBookOwnershipDto: UpdateBookOwnershipDto,
  ) {
    return this.bookOwnershipsService.update(username, bookId, updateBookOwnershipDto);
  }

  @Delete(':bookId')
  remove(@Param('username') username: string, @Param('bookId') bookId: string) {
    return this.bookOwnershipsService.remove(username, bookId);
  }
}
