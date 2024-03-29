import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { BookOwnershipsService } from './book-ownerships.service';
import { BookOwnershipsController } from './book-ownerships.controller';
import { BookOwnershipsRepository } from './repositories/book-ownerships-repository';
import { BookOwnershipsRepositoryTypeOrmAdapter } from './repositories/book-ownerships-repository-typeorm.adapter';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { BookOwnership } from './entities/book-ownership.entity';
import { BookOwnershipMongo, BookOwnershipMongoSchema } from './schemas/book-ownership.schema';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forFeature([
      { name: BookOwnershipMongo.name, schema: BookOwnershipMongoSchema },
    ]),
    UsersModule,
    CqrsModule,
    TypeOrmModule.forFeature([BookOwnership]),
  ],
  controllers: [BookOwnershipsController],
  providers: [
    BookOwnershipsService,
    BooksService,
    UsersService,
    {
      provide: BookOwnershipsRepository,
      useClass: BookOwnershipsRepositoryTypeOrmAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class BookOwnershipsModule {}
