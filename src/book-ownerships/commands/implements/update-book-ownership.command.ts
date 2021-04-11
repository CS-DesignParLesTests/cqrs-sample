import { ICommand } from '@nestjs/cqrs';
import { UpdateBookOwnershipDto } from '../../dto/update-book-ownership.dto';

export class UpdateBookOwnershipCommand implements ICommand {
  constructor(
    public readonly username: string,
    public readonly bookId: string,
    public payload: UpdateBookOwnershipDto,
  ) {}
}
