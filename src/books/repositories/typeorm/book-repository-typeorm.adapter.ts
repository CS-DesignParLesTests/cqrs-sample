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

    // Je crois que je me suis perdu, help pour reecrire avec async/await
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

  private async handleCreateMongo(id: string): Promise<void> {
    const toWrite: Book = await this.booksRepository.findOne(id);
    const createdBook: BookMongoDocument = new this.bookModel(toWrite);
    //? await or not for last ? or return ? or return await ?
    await createdBook.save();
  }

  async create(id: string, payload: CreateBookDto): Promise<Book> {
    const output: Promise<Book> = this.booksRepository.save({
      id,
      ...payload,
    });
    //? Possible de reecrire avec async ???
    output.then(async () => {
      await this.handleCreateMongo(id);
    });
    return output;
  }

  private async handleDeleteMongo(id: string): Promise<void> {
    //? await or not ?
    await this.bookModel.deleteOne({ id: id });
  }

  async delete(id: string): Promise<void> {
    // The real type is Promise<DeleteResult>
    //  not used to avoid useless import
    //  and beacause the type is not relevant in this case
    const output: Promise<any> = this.booksRepository.delete(id);
    output.then(async () => {
      await this.handleDeleteMongo(id);
    });
    //? ou juste 'return' ?
    return output;
  }

  private async handleUpdateMongo(id: string): Promise<void> {
    const originalBook: Book = await this.booksRepository.findOne(id);
    const documentBook: BookMongoDocument = await this.bookModel.findOne({ id: id }).exec();
    documentBook.set(originalBook);
    //? await or not for last ? or return ? or return await ?
    await documentBook.save();
  }

  async update(id: string, payload: UpdateBookDto): Promise<void> {
    //? est ce que vous pensez que cette implemetation est mieux que celle de delete ?
    return new Promise((resolve, reject) => {
      const output: Promise<any> = this.booksRepository.update(id, payload);
      output
        .then(async () => {
          resolve();
          //? or this.handleUpdateMongo(id) sans async
          await this.handleUpdateMongo(id);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
