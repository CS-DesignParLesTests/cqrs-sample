import { BookRepositoryMemoryAdapter } from './book-repository-memory.adapter';
import { CreateBookDto } from '../../dto/create-book.dto';

describe('Repository Memory Adapter', () => {
  let repository: BookRepositoryMemoryAdapter;
  let catchFn;

  const bookInfos: CreateBookDto = {
    title: 'title test',
    author: 'author test',
  };
  const bookId = 11;

  beforeEach(() => {
    repository = new BookRepositoryMemoryAdapter();
    catchFn = jest.fn();
  });

  it('Create new one normal', async () => {
    try {
      const book = await repository.create(bookId, bookInfos);
      expect(book.title).toBe(bookInfos.title);
      expect(book.author).toBe(bookInfos.author);
      expect(book.id).toBe(bookId);
    } catch (error) {
      catchFn();
    }
    expect(catchFn).not.toHaveBeenCalled();
  });

  it('Create new one id null', async () => {
    try {
      const book = await repository.create(null, bookInfos);
      expect(book.title).toBe(bookInfos.title);
      expect(book.author).toBe(bookInfos.author);
      expect(book.id).toBe(null);
    } catch (error) {
      catchFn();
    }
    expect(catchFn).not.toHaveBeenCalled();
  });
});
