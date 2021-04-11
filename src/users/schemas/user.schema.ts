import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserMongoDocument = UserMongo & Document;

@Schema()
export class UserMongo {
  @Prop()
  username: string;

  @Prop()
  displayname: string;
}

export const UserMongoSchema = SchemaFactory.createForClass(UserMongo);
