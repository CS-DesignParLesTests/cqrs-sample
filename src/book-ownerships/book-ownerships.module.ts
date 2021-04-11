import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { BookOwnershipsService } from './book-ownerships.service';
import { BookOwnershipsController } from './book-ownerships.controller';
import { BookOwnershipsRepository } from './repositories/book-ownerships-repository';
import { BookOwnershipsRepositoryMemoryAdapter } from './repositories/memory/book-ownerships-repository-memory.adapter';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [BooksModule, UsersModule, CqrsModule],
  controllers: [BookOwnershipsController],
  providers: [
    BookOwnershipsService,
    BooksService,
    UsersService,
    {
      provide: BookOwnershipsRepository,
      useClass: BookOwnershipsRepositoryMemoryAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class BookOwnershipsModule {}
