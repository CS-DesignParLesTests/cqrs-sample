import { ICommand } from '@nestjs/cqrs';
import { AddBookOwnershipDto } from '../../dto/add-book-ownership.dto';

export class CreateBookOwnershipCommand implements ICommand {
  constructor(public readonly username: string, public payload: AddBookOwnershipDto) {}
}
