import { CreateBookOwnershipHandler } from './create-book-ownership.handler';
import { DeleteBookOwnershipHandler } from './delete-book-ownership.handler';
import { UpdateBookOwnershipHandler } from './update-book-ownership.handler';

export const CommandHandlers = [
  CreateBookOwnershipHandler,
  DeleteBookOwnershipHandler,
  UpdateBookOwnershipHandler,
];
