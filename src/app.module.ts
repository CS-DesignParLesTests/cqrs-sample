import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { BookOwnershipsModule } from './book-ownerships/book-ownerships.module';

@Module({
  imports: [BooksModule, UsersModule, BookOwnershipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
