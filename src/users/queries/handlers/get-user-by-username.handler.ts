import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from '../implements';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../entities/user.entity';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler implements IQueryHandler<GetUserByUsernameQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetUserByUsernameQuery): Promise<User | undefined> {
    return this.usersRepository.findOneByUsername(query.username);
  }
}
