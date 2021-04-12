import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from './users-repository';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserMongo, UserMongoDocument } from '../schemas/user.schema';

@Injectable()
export class UsersRepositoryTypeOrmAdapter
  extends UsersRepository
  implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectModel(UserMongo.name) private userModel: Model<UserMongoDocument>,
  ) {
    super();
  }

  async onApplicationBootstrap() {
    console.log(
      'OnApplicationBootstrap from UsersRepositoryTypeOrmAdapter : Sync mongo with mysql',
    );
    const allUsers: User[] = await this.usersRepository.find();
    await this.userModel.deleteMany({});
    for (let index = 0; index < allUsers.length; index++) {
      const element: User = allUsers[index];
      const createdUser: UserMongoDocument = new this.userModel(element);
      await createdUser.save();
    }
    return;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const document: UserMongoDocument = await this.userModel.findOne({ username: username }).exec();
    if (document === null) {
      return undefined;
    } else {
      return new User(document.toObject());
    }
  }

  async findAll(): Promise<User[]> {
    const documents: UserMongoDocument[] = await this.userModel.find({}).exec();
    const output: User[] = [];
    for (let index = 0; index < documents.length; index++) {
      output[index] = new User(documents[index].toObject());
    }
    return output;
  }

  private async handleCreateMongo(username: string): Promise<void> {
    const toWrite: User = await this.usersRepository.findOne(username);
    const createdUser: UserMongoDocument = new this.userModel(toWrite);
    await createdUser.save();
    return;
  }

  async create(user: User): Promise<User> {
    const output: User = await this.usersRepository.save(user);
    this.handleCreateMongo(user.username);
    return output;
  }

  private async handleUpdateMongo(username: string): Promise<void> {
    const originalUserPromise: Promise<User> = this.usersRepository.findOne(username);
    const documentUserPromise: Promise<UserMongoDocument> = this.userModel
      .findOne({ username: username })
      .exec();
    const originalUser = await originalUserPromise;
    const documentUser = await documentUserPromise;
    documentUser.set(originalUser);
    await documentUser.save();
    return;
  }

  async update(username: string, payload: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(username, payload);
    this.handleUpdateMongo(username);
    return;
  }

  private async handleDeleteMongo(username: string): Promise<void> {
    await this.userModel.deleteOne({ username: username });
    return;
  }

  async delete(username: string): Promise<void> {
    await this.usersRepository.delete(username);
    this.handleDeleteMongo(username);
    return;
  }
}
