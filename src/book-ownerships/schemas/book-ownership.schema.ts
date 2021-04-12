import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookOwnershipMongoDocument = BookOwnershipMongo & Document;

@Schema()
export class BookOwnershipMongo {
  @Prop()
  username: string;
  @Prop()
  bookId: string;
  @Prop()
  isBought: boolean;
  @Prop()
  isSigned: boolean;
  @Prop()
  isLent: boolean;
  @Prop()
  dateAcquired: Date | undefined;
  @Prop()
  dateRead: Date | undefined;
}

export const BookOwnershipMongoSchema = SchemaFactory.createForClass(BookOwnershipMongo);
