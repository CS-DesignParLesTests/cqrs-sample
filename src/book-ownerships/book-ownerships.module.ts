import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BooksModule } from '../books/books.module';
import { BookOwnershipsService } from './book-ownerships.service';
import { BookOwnershipsController } from './book-ownerships.controller';
import { BookOwnershipsRepository } from './repositories/book-ownerships-repository';
import { BookOwnershipsRepositoryMemoryAdapter } from './repositories/book-ownerships-repository-memory.adapter';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [BooksModule, CqrsModule],
  controllers: [BookOwnershipsController],
  providers: [
    BookOwnershipsService,
    {
      provide: BookOwnershipsRepository,
      useClass: BookOwnershipsRepositoryMemoryAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class BookOwnershipsModule {}
