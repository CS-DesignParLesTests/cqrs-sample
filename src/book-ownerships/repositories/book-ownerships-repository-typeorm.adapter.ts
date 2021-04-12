import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookOwnershipDto } from '../dto/update-book-ownership.dto';
import { BookOwnershipsRepository } from './book-ownerships-repository';
import { BookOwnership } from '../entities/book-ownership.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookOwnershipMongo, BookOwnershipMongoDocument } from '../schemas/book-ownership.schema';

@Injectable()
export class BookOwnershipsRepositoryTypeOrmAdapter
  extends BookOwnershipsRepository
  implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(BookOwnership)
    private bookOwnershipsRepository: Repository<BookOwnership>,
    @InjectModel(BookOwnershipMongo.name)
    private bookOwnershipModel: Model<BookOwnershipMongoDocument>,
  ) {
    super();
  }

  async onApplicationBootstrap() {
    console.log(
      'OnApplicationBootstrap from BookOwnershipsRepositoryTypeOrmAdapter : Sync mongo with mysql',
    );
    const allbookOwnerships: BookOwnership[] = await this.bookOwnershipsRepository.find();
    await this.bookOwnershipModel.deleteMany({});
    for (let index = 0; index < allbookOwnerships.length; index++) {
      const element: BookOwnership = allbookOwnerships[index];
      const createdBookOwnership: BookOwnershipMongoDocument = new this.bookOwnershipModel(element);
      await createdBookOwnership.save();
    }
    return;
  }

  async findOneByUsernameAndId(
    _username: string,
    _bookId: string,
  ): Promise<BookOwnership | undefined> {
    const document: BookOwnershipMongoDocument = await this.bookOwnershipModel
      .findOne({ username: _username, bookId: _bookId })
      .exec();
    if (document === null) {
      return undefined;
    } else {
      return new BookOwnership(document.toObject());
    }
  }

  async findAllByUsername(_username: string): Promise<BookOwnership[]> {
    const documents: BookOwnershipMongoDocument[] = await this.bookOwnershipModel
      .find({ username: _username })
      .exec();
    const output: BookOwnership[] = [];
    for (let index = 0; index < documents.length; index++) {
      output[index] = new BookOwnership(documents[index].toObject());
    }
    return output;
  }

  private async handleCreateMongo(ids: Record<string, any>): Promise<void> {
    const toWrite: BookOwnership = await this.bookOwnershipsRepository.findOne(ids);
    const createdBookOwnership: BookOwnershipMongoDocument = new this.bookOwnershipModel(toWrite);
    await createdBookOwnership.save();
    return;
  }

  async create(bookOwnership: BookOwnership): Promise<BookOwnership> {
    const output: BookOwnership = await this.bookOwnershipsRepository.save(bookOwnership);
    this.handleCreateMongo({ username: bookOwnership.username, bookId: bookOwnership.bookId });
    return output;
  }

  private async handleUpdateMongo(ids: Record<string, any>): Promise<void> {
    const originalBookOwnershipPromise: Promise<BookOwnership> = this.bookOwnershipsRepository.findOne(
      ids,
    );
    const documentBookOwnershipPromise: Promise<BookOwnershipMongoDocument> = this.bookOwnershipModel
      .findOne(ids)
      .exec();
    const originalBookOwnership = await originalBookOwnershipPromise;
    const documentBookOwnership = await documentBookOwnershipPromise;
    documentBookOwnership.set(originalBookOwnership);
    await documentBookOwnership.save();
    return;
  }

  async update(_username: string, _bookId: string, payload: UpdateBookOwnershipDto): Promise<void> {
    await this.bookOwnershipsRepository.update({ username: _username, bookId: _bookId }, payload);
    this.handleUpdateMongo({ username: _username, bookId: _bookId });
    return;
  }

  private async handleDeleteMongo(ids: Record<string, any>): Promise<void> {
    await this.bookOwnershipModel.deleteOne(ids);
    return;
  }

  async delete(_username: string, _bookId: string): Promise<void> {
    await this.bookOwnershipsRepository.delete({ username: _username, bookId: _bookId });
    this.handleDeleteMongo({ username: _username, bookId: _bookId });
    return;
  }
}
