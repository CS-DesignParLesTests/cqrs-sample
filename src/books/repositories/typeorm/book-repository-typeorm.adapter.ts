import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { BooksRepository } from '../book-repository';
import { Book } from '../../entities/book.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookMongo, BookMongoDocument } from '../../schemas/book.schema';

@Injectable()
export class BookRepositoryTypeOrmAdapter
  extends BooksRepository
  implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectModel(BookMongo.name) private bookModel: Model<BookMongoDocument>,
  ) {
    super();
  }

  async onApplicationBootstrap() {
    console.log('OnApplicationBootstrap from BookRepositoryTypeOrmAdapter : Sync mongo with mysql');
    const allBooks: Book[] = await this.booksRepository.find();
    await this.bookModel.deleteMany({});
    for (let index = 0; index < allBooks.length; index++) {
      const element: Book = allBooks[index];
      const createdBook: BookMongoDocument = new this.bookModel(element);
      await createdBook.save();
    }
    return;
  }

  async findOneById(id: string): Promise<Book> {
    const document: BookMongoDocument = await this.bookModel.findOne({ id: id }).exec();
    if (document === null) {
      // doesn't correspond to output type, minor fix to do
      return undefined;
    } else {
      return new Book(document.toObject());
    }
  }

  async findAll(): Promise<Book[]> {
    const documents: BookMongoDocument[] = await this.bookModel.find({}).exec();
    const output: Book[] = [];
    for (let index = 0; index < documents.length; index++) {
      output[index] = new Book(documents[index].toObject());
    }
    return output;
  }

  private async handleCreateMongo(id: string): Promise<void> {
    const toWrite: Book = await this.booksRepository.findOne(id);
    const createdBook: BookMongoDocument = new this.bookModel(toWrite);
    await createdBook.save();
    return;
  }

  async create(id: string, payload: CreateBookDto): Promise<Book> {
    const output: Book = await this.booksRepository.save({
      id,
      ...payload,
    });
    this.handleCreateMongo(id);
    return output;
  }

  private async handleDeleteMongo(id: string): Promise<void> {
    await this.bookModel.deleteOne({ id: id });
    return;
  }

  async delete(id: string): Promise<void> {
    await this.booksRepository.delete(id);
    this.handleDeleteMongo(id);
    return;
  }

  private async handleUpdateMongo(id: string): Promise<void> {
    const originalBookPromise: Promise<Book> = this.booksRepository.findOne(id);
    const documentBookPromise: Promise<BookMongoDocument> = this.bookModel
      .findOne({ id: id })
      .exec();
    const originalBook = await originalBookPromise;
    const documentBook = await documentBookPromise;
    documentBook.set(originalBook);
    await documentBook.save();
    return;
  }

  async update(id: string, payload: UpdateBookDto): Promise<void> {
    await this.booksRepository.update(id, payload);
    this.handleUpdateMongo(id);
    return;
  }
}
