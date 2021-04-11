import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookOwnershipsByUserQuery } from '../implements';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { BookOwnership } from '../../entities/book-ownership.entity';

@QueryHandler(GetBookOwnershipsByUserQuery)
export class GetBookOwnershipsByUserHandler implements IQueryHandler<GetBookOwnershipsByUserQuery> {
  constructor(private readonly bookOwnershipsRepository: BookOwnershipsRepository) {}

  async execute(query: GetBookOwnershipsByUserQuery): Promise<BookOwnership[]> {
    return this.bookOwnershipsRepository.findAllByUsername(query.username);
  }
}
