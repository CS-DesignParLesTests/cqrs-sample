import { Module } from '@nestjs/common';
import { BookOwnershipsService } from './book-ownerships.service';
import { BookOwnershipsController } from './book-ownerships.controller';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [BookOwnershipsController],
  providers: [BookOwnershipsService],
  exports: [BookOwnershipsService],
})
export class BookOwnershipsModule {}
