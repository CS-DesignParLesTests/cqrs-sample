import { PartialType } from '@nestjs/mapped-types';
import { AddBookOwnershipDto } from './add-book-ownership.dto';

export class UpdateBookOwnershipDto extends PartialType(AddBookOwnershipDto) {}
