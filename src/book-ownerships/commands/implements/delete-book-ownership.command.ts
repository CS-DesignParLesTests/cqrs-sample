import { ICommand } from '@nestjs/cqrs';

export class DeleteBookOwnershipCommand implements ICommand {
  constructor(public readonly username: string, public readonly bookId: string) {}
}
