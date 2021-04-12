import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookMongoDocument = BookMongo & Document;

@Schema()
export class BookMongo {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  author: string;
}

export const BookMongoSchema = SchemaFactory.createForClass(BookMongo);
