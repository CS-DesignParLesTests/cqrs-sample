import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [UsersService, ...CommandHandlers, ...QueryHandlers],
})
export class UsersModule {}
