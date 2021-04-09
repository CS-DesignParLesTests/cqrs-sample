import { Injectable } from '@nestjs/common';
import { AddBookOwnershipDto } from './dto/add-book-ownership.dto';

@Injectable()
export class BookOwnershipsService {
  create(username: string, createBookOwnershipDto: AddBookOwnershipDto) {
    return 'This action adds a new bookOwnership';
  }

  findAllByUsername(username: string) {
    return `This action returns all bookownerships by username`;
  }

  findOneByUsernameAndId(username: string, id: string) {
    return `This action returns a #${id} bookOwnership`;
  }

  /* TODO
  update(username: string, id: string, updateBookOwnershipDto: UpdateBookOwnershipDto) {
    return `This action updates a #${id} bookOwnership`;
  }
*/
  remove(username: string, id: string) {
    return `This action removes a #${id} bookOwnership`;
  }
}
