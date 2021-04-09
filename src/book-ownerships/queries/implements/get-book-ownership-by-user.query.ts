import { IQuery } from '@nestjs/cqrs';

export class GetBookOwnershipByUserQuery implements IQuery {
  constructor(public readonly username: string) {}
}
