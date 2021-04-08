import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { CommandHandlers } from './commands/indexCommand';
import { QueryHandlers } from './queries/indexQuery';
import { CqrsModule } from '@nestjs/cqrs';
import { BookRepositoryTypeOrmAdapter } from './repository/typeorm/book-repository-typeorm.adapter';
import { BookRepository } from './repository/book-repository';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BookRepository,
      useClass: BookRepositoryTypeOrmAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [BooksService],
})
export class BooksModule {}
