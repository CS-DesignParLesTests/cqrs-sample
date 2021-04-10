import { IQuery } from '@nestjs/cqrs';

export class GetBookOwnershipByUserAndIdQuery implements IQuery {
  constructor(public readonly username: string, public readonly bookId: string) {}
}
