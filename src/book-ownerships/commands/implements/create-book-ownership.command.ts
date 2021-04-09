import { ICommand } from '@nestjs/cqrs';
import { CreateBookOwnershipDto } from '../../dto/create-book-ownership.dto';

export class CreateBookOwnershipCommand implements ICommand {
  constructor(public readonly username: string, public payload: CreateBookOwnershipDto) {}
}
