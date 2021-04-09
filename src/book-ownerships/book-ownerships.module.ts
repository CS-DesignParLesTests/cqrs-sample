import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookOwnershipsService } from './book-ownerships.service';
import { BookOwnershipsController } from './book-ownerships.controller';
import { BooksModule } from '../books/books.module';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [BooksModule, CqrsModule],
  controllers: [BookOwnershipsController],
  providers: [BookOwnershipsService, ...CommandHandlers, ...QueryHandlers],
})
export class BookOwnershipsModule {}
