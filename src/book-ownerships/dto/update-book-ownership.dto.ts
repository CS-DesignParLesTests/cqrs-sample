import { PartialType } from '@nestjs/mapped-types';
import { CreateBookOwnershipDto } from './create-book-ownership.dto';

export class UpdateBookOwnershipDto extends PartialType(CreateBookOwnershipDto) {}
