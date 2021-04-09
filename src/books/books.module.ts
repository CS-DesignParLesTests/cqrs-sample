import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { CommandHandlers } from './commands/indexCommand';
import { QueryHandlers } from './queries/indexQuery';
import { CqrsModule } from '@nestjs/cqrs';
import { BookRepositoryMemoryAdapter } from './repository/memory/book-repository-memory.adapter';
import { BookRepository } from './repository/book-repository';
import { BooksService } from './books.service';

@Module({
  imports: [CqrsModule],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BookRepository,
      useClass: BookRepositoryMemoryAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [BooksService],
})
export class BooksModule {}
