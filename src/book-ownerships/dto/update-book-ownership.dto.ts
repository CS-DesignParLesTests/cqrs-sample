import { CreateBookOwnershipDto } from './create-book-ownership.dto';
import { OmitType } from '@nestjs/swagger';


export class UpdateBookOwnershipDto extends OmitType(CreateBookOwnershipDto, ['bookId'] as const) {}
