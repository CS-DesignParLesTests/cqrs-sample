import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookOwnershipCommand } from '../implements';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { BookOwnership } from '../../entities/book-ownership.entity';
import { UsersService } from '../../../users/users.service';
import { BooksService } from '../../../books/books.service';

@CommandHandler(CreateBookOwnershipCommand)
export class CreateBookOwnershipHandler implements ICommandHandler<CreateBookOwnershipCommand> {
  constructor(
    private bookOwnershipsRepository: BookOwnershipsRepository,
    private usersService: UsersService,
    private booksService: BooksService,
  ) {}

  async execute(command: CreateBookOwnershipCommand): Promise<BookOwnership> {
    const bookOwnershipToCreate = new BookOwnership(
      Object.assign({ username: command.username }, command.payload),
    );

    const existingBookOwnership = await this.bookOwnershipsRepository.findOneByUsernameAndId(
      bookOwnershipToCreate.username,
      bookOwnershipToCreate.bookId,
    );
    if (existingBookOwnership) throw new Error('BookOwnership already exists');

    if (
      (await this.usersService.findByUsername(bookOwnershipToCreate.username)) == undefined ||
      (await this.booksService.find(bookOwnershipToCreate.bookId)) == undefined
    ) {
      throw new Error('User or Book does not exist');
    } else return await this.bookOwnershipsRepository.create(bookOwnershipToCreate);
  }
}
