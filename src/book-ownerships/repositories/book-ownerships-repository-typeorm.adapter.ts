import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookOwnershipsRepository } from './book-ownerships-repository';
import { BookOwnership } from '../entities/book-ownership.entity';

@Injectable()
export class BookOwnershipsRepositoryTypeOrmAdapter extends BookOwnershipsRepository {
  constructor(
    @InjectRepository(BookOwnership)
    private bookOwnershipsRepository: Repository<BookOwnership>,
  ) {
    super();
  }

  async findOneByUsernameAndId(
    username: string,
    bookId: string,
  ): Promise<BookOwnership | undefined> {
    return this.bookOwnershipsRepository.findOne(username);
  }

  async findAllByUsername(_username: string): Promise<BookOwnership[]> {
    return this.bookOwnershipsRepository.find({ where: { username: _username } });
  }

  async create(bookOwnership: BookOwnership): Promise<BookOwnership> {
    return this.bookOwnershipsRepository.save(bookOwnership);
  }

  async update(bookOwnership: BookOwnership): Promise<BookOwnership> {
    throw Error('NotImplemented');
  }

  async delete(username: string, bookId: string): Promise<void> {
    throw Error('NotImplemented');
    // await this.bookOwnershipsRepository.delete();
  }
}

// @Injectable()
// export class UsersRepositoryTypeOrmAdapter extends BookOwnershipsRepository {
//   constructor(
//     @InjectRepository(BookOwnership)
//     private usersRepository: Repository<BookOwnership>,
//   ) {
//     super();
//   }

//   async findOneByUsername(username: string): Promise<BookOwnership | undefined> {
//     return this.usersRepository.findOne(username);
//   }

//   async findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   async create(user: User): Promise<User> {
//     return this.usersRepository.save(user);
//   }

//   async update(username: string, user: User): Promise<User> {
//     throw Error('NotImplemented');
//   }

//   async delete(username: string): Promise<void> {
//     // this.users = this.users.filter((User) => username !== User.username);
//     await this.usersRepository.delete(username);
//   }
// }
