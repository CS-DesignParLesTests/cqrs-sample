import { IQuery } from '@nestjs/cqrs';

export class GetBookOwnershipsByUserQuery implements IQuery {
  constructor(public readonly username: string) {}
}
