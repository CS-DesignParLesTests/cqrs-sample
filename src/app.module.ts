import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { BookOwnershipsModule } from './book-ownerships/book-ownerships.module';
import { Book } from './books/entities/book.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    BooksModule,
    UsersModule,
    BookOwnershipsModule,
    MongooseModule.forRoot('mongodb://databasemongo:27017/test'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'nestjs',
      password: 'nestjs',
      database: 'demonestjs',
      entities: [Book, User],
      synchronize: false,
      retryAttempts: 5,
      retryDelay: 5000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
