import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Book } from '../src/books/entities/book.entity';
import { BookOwnership } from '../src/book-ownerships/entities/book-ownership.entity';

describe('Core app', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    connection = app.get(Connection);
  });

  describe('Books', () => {
    it('Post a book, get by id, delete', async () => {
      const book = {
        id: 'bc5722e6-2d22-5641-a8a4-4ffe90ce8ebb',
        title: 'Strike The Blood',
        author: 'Gakuto, Mikumo',
      };

      // Post a book
      const data = await request(app.getHttpServer()).post('/books').send(book).expect(201);
      expect(data.body).toEqual({
        ...book,
      });

      // Get by id
      const retrievedBook = await request(app.getHttpServer()).get(`/books/${book.id}`).expect(200);
      expect(retrievedBook.body).toEqual(data.body);

      // Delete posted book
      return request(app.getHttpServer()).delete(`/books/${data.body.id}`).expect(200);
    });

    afterEach(async () => {
      await connection.createQueryBuilder().delete().from(BookOwnership).execute();

      await connection.createQueryBuilder().delete().from(Book).execute();
    });
  });

  /*
  describe('Users', () => {
    it('should return an array of users from current test pre-population', async () => {
      // Pre-populate DB with some dummy books
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            username: 'Nathalie',
            displayName: 'Majora',
          },
          {
            username: 'Benoit',
            displayName: 'Sepe',
          },
        ])
        .execute();

      // Run e2e test
      const { body } = await request(app.getHttpServer())
        .get('/books')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toEqual([
        {
          username: 'Nathalie',
          displayName: 'Majora',
        },
        {
          username: 'Benoit',
          displayName: 'Sepe',
        },
      ]);
    });

    afterEach(async () => {
      await connection.createQueryBuilder().delete().from(BookOwnership).execute();

      await connection.createQueryBuilder().delete().from(User).execute();
    });
  });
  */

  afterAll(async () => {
    await app.close();
  });
});
