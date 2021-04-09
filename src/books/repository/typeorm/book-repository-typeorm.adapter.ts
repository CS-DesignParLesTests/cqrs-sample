import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../../dto/create-book.dto';
import { BookRepository } from '../book-repository';
import { Book } from '../../entities/book.entity';

@Injectable()
export class BookRepositoryTypeOrmAdapter extends BookRepository {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {
    super();
  }

  async findOneById(id: string): Promise<Book> {
    return this.booksRepository.findOne(id);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async create(id: string, payload: CreateBookDto): Promise<Book> {
    return this.booksRepository.save({
      id,
      ...payload,
    });
  }

  async delete(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
