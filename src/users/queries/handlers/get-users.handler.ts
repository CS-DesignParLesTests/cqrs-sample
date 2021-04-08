import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../implements';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../entities/user.entity';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetUsersQuery): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
