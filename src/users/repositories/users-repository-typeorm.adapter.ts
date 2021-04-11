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
      const createdBook: UserMongoDocument = new this.userModel(element);
      await createdBook.save();
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

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(username: string, payload: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(username, payload);
  }
  async delete(username: string): Promise<void> {
    // this.users = this.users.filter((User) => username !== User.username);
    await this.usersRepository.delete(username);
  }
}
