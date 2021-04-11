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
  }

  async findOneById(id: string): Promise<Book> {
    // return this.booksRepository.findOne(id);
    const document: BookMongoDocument = await this.bookModel.findOne({ id: id }).exec();
    return new Book(document.toObject());
  }

  async findAll(): Promise<Book[]> {
    // return this.booksRepository.find();

    // Je crois que je me suis perdu, help pour reecrire acev async/await
    // return new Promise((resolve, reject) => {
    //   this.bookModel
    //     .find({})
    //     .exec()
    //     .then((value: BookMongoDocument[]) => {
    //       const tmp: Book[] = [];
    //       for (let index = 0; index < value.length; index++) {
    //         tmp[index] = new Book(value[index].toObject());
    //       }
    //       resolve(tmp);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });

    const documents: BookMongoDocument[] = await this.bookModel.find({}).exec();
    const output: Book[] = [];
    for (let index = 0; index < documents.length; index++) {
      output[index] = new Book(documents[index].toObject());
    }
    return output;
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

  async update(id: string, payload: UpdateBookDto): Promise<void> {
    await this.booksRepository.update(id, payload);
  }
}
