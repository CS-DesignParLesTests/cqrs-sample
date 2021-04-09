import { CreateBookHandler } from './handlers/create-book.handler';
import { DeleteBookHandler } from './handlers/delete-book.handler';

export const CommandHandlers = [CreateBookHandler, DeleteBookHandler];
