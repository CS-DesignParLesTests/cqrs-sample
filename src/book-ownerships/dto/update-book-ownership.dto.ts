import { PartialType } from '@nestjs/mapped-types';
import { CreateBookOwnershipDto } from './create-book-ownership.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateBookOwnershipDto extends PartialType(
  OmitType(CreateBookOwnershipDto, ['bookId'] as const),
) {}
