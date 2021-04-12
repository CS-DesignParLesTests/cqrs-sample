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
    _username: string,
    _bookId: string,
  ): Promise<BookOwnership | undefined> {
    return this.bookOwnershipsRepository.findOne({
      where: { username: _username, bookId: _bookId },
    });
  }

  async findAllByUsername(_username: string): Promise<BookOwnership[]> {
    //? Y faut mettre le await ??
    //?  genre : return await this.bookOwnershipsRepository.find({ where: { username: _username } });
    //?  pour moi les 2 sont bon, c'est ca ? si oui y en a un a privilegier ?
    return this.bookOwnershipsRepository.find({ where: { username: _username } });
  }

  async create(bookOwnership: BookOwnership): Promise<BookOwnership> {
    return this.bookOwnershipsRepository.save(bookOwnership);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(bookOwnership: BookOwnership): Promise<BookOwnership> {
    throw Error('NotImplemented');
  }

  async delete(_username: string, _bookId: string): Promise<void> {
    await this.bookOwnershipsRepository.delete({ username: _username, bookId: _bookId });
    return;
  }
}
