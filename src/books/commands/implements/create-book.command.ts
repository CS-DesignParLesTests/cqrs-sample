import { CreateBookDto } from '../../dto/create-book.dto';

export class CreateBookCommand {
  constructor(public payload: CreateBookDto) {}
}
