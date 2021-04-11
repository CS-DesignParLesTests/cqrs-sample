import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users-repository';
import { UsersRepositoryTypeOrmAdapter } from './repositories/users-repository-typeorm.adapter';
import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { User } from './entities/user.entity';
import { UserMongo, UserMongoSchema } from './schemas/user.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: UserMongo.name, schema: UserMongoSchema }]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryTypeOrmAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [UsersService],
})
export class UsersModule {}
