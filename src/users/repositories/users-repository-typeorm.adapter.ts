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
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    // return this.usersRepository.findOne(username);
    const document: UserMongoDocument = await this.userModel.findOne({ username: username }).exec();
    if (document === null) {
      return undefined;
    } else {
      return new User(document.toObject());
    }
  }

  async findAll(): Promise<User[]> {
    // return this.usersRepository.find();
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
    //? await or not for last ? or return ? or return await ?
    await createdUser.save();
  }

  async create(user: User): Promise<User> {
    const output: Promise<User> = this.usersRepository.save(user);
    output.then(async () => {
      await this.handleCreateMongo(user.username);
    });
    return output;
  }

  private async handleUpdateMongo(username: string): Promise<void> {
    const originalUser: User = await this.usersRepository.findOne(username);
    const documentUser: UserMongoDocument = await this.userModel
      .findOne({ username: username })
      .exec();
    documentUser.set(originalUser);
    //? await or not for last ? or return ? or return await ?
    await documentUser.save();
  }

  async update(username: string, payload: UpdateUserDto): Promise<void> {
    // await this.usersRepository.update(username, payload);
    return new Promise((resolve, reject) => {
      const output: Promise<any> = this.usersRepository.update(username, payload);
      output
        .then(async () => {
          resolve();
          //? or this.handleUpdateMongo(username) sans async
          await this.handleUpdateMongo(username);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  private async handleDeleteMongo(username: string): Promise<void> {
    //? await or not ?
    await this.userModel.deleteOne({ username: username });
  }

  async delete(username: string): Promise<void> {
    // await this.usersRepository.delete(username);

    // The real type is Promise<DeleteResult>
    //  not used to avoid useless import
    //  and beacause the type is not relevant in this case
    const output: Promise<any> = this.usersRepository.delete(username);
    output.then(async () => {
      await this.handleDeleteMongo(username);
    });
    //? ou 'return output' ou pas de return ?
    return;
  }
}
