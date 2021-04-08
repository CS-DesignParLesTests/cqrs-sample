import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users-repository';
import { UsersRepositoryMemoryAdapter } from './repositories/users-repository-memory.adapter';
import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryMemoryAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class UsersModule {}
