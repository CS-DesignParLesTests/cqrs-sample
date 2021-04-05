import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { CqrsModule } from '@nestjs/cqrs';
@Module({
  imports: [CqrsModule],
  controllers: [BooksController],
})
export class BooksModule {}
