import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookOwnershipsService } from './book-ownerships.service';
import { AddBookOwnershipDto } from './dto/add-book-ownership.dto';

@Controller('users/:user/books-owned/')
export class BookOwnershipsController {
  constructor(private readonly bookOwnershipsService: BookOwnershipsService) {}

  @Post()
  add(@Param('username') username: string, @Body() addBookOwnershipDto: AddBookOwnershipDto) {
    return this.bookOwnershipsService.create(username, addBookOwnershipDto);
  }

  @Get()
  findAll(@Param('username') username: string) {
    return this.bookOwnershipsService.findAllByUsername(username);
  }

  @Get(':id')
  findOne(@Param('username') username: string, @Param('id') id: string) {
    return this.bookOwnershipsService.findOneByUsernameAndId(username, id);
  }

  /*
  @Patch(':id')
  update(
    @Param('username') username: string,
    @Param('id') id: string,
    @Body() updateBookOwnershipDto: UpdateBookOwnershipDto,
  ) {
    return this.bookOwnershipsService.update(username, updateBookOwnershipDto);
  }*/

  @Delete(':id')
  remove(@Param('username') username: string, @Param('id') id: string) {
    return this.bookOwnershipsService.remove(username, id);
  }
}
