import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookOwnershipByUserAndIdQuery } from '../implements';
import { BookOwnershipsRepository } from '../../repositories/book-ownerships-repository';
import { BookOwnership } from '../../entities/book-ownership.entity';

@QueryHandler(GetBookOwnershipByUserAndIdQuery)
export class GetBookOwnershipByUserAndIdHandler
  implements IQueryHandler<GetBookOwnershipByUserAndIdQuery> {
  constructor(private readonly bookOwnershipsRepository: BookOwnershipsRepository) {}

  async execute(query: GetBookOwnershipByUserAndIdQuery): Promise<BookOwnership | undefined> {
    return this.bookOwnershipsRepository.findOneByUsernameAndId(query.username, query.bookId);
  }
}
