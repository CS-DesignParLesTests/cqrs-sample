import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { CommandHandlers } from './commands/indexCommand';
import { QueryHandlers } from './queries/indexQuery';
import { CqrsModule } from '@nestjs/cqrs';
import { BookRepositoryTypeOrmAdapter } from './repositories/typeorm/book-repository-typeorm.adapter';
import { BooksService } from './books.service';
import { BooksRepository } from './repositories/book-repository';
import { Book } from './entities/book.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BooksRepository,
      useClass: BookRepositoryTypeOrmAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [BooksService],
})
export class BooksModule {}
