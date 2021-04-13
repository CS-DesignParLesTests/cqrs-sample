import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Book } from '../src/books/entities/book.entity';
import { BookOwnership } from '../src/book-ownerships/entities/book-ownership.entity';
import { User } from '../src/users/entities/user.entity';

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
    it('Post a book, check returned data, query it by id, update it and finally delete it', async () => {
      const book = {
        title: 'Strike The Blood',
        author: 'Gakuto, Mikumo',
      };

      // POST a book
      const { body: createdBook } = await request(app.getHttpServer())
        .post('/books')
        .send(book)
        .expect(201);
      //Check return value
      expect(createdBook).toMatchObject(book);
      const bookId = createdBook.id;

      // GET one book by id
      const retrievedBook = await request(app.getHttpServer()).get(`/books/${bookId}`).expect(200);
      //Check return value
      expect(retrievedBook.body).toEqual(createdBook);

      // GET the books list
      const retrievedBookList = await request(app.getHttpServer()).get(`/books`).expect(200);
      //Check return value
      expect(retrievedBookList.body).toEqual([createdBook]);

      //PATCH a book

      await request(app.getHttpServer())
        .patch(`/books/${createdBook.id}`)
        .send({ title: 'Strike The Blood !' })
        .expect(200);

      // GET the updated book by id
      const retrievedUpdatedBook = await request(app.getHttpServer())
        .get(`/books/${bookId}`)
        .expect(200);
      expect(retrievedUpdatedBook.body).toEqual(
        Object.assign({}, createdBook, { title: 'Strike The Blood' }),
      );

      // DELETE posted book
      await request(app.getHttpServer()).delete(`/books/${createdBook.id}`).expect(200);
    });
  });

  describe('Users', () => {
    it('post users, get array, update, delete ', async () => {
      // populate DB with some dummy users
      const user1 = {
        username: 'Nathalie',
        displayName: 'Majora',
      };
      const user2 = {
        username: 'Benoit',
        displayName: 'Sepe',
      };

      // POST both users and check the return values

      const { body: createdUser1 } = await request(app.getHttpServer())
        .post('/users')
        .send(user1)
        .expect('Content-Type', /json/)
        .expect(201);
      expect(createdUser1).toMatchObject(user1);

      const { body: createdUser2 } = await request(app.getHttpServer())
        .post('/users')
        .send(user2)
        .expect('Content-Type', /json/)
        .expect(201);
      expect(createdUser2).toMatchObject(user2);

      //GET Users
      const { body: users } = await request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200);

      expect(users).toEqual([
        {
          username: 'Nathalie',
          displayName: 'Majora',
        },
        {
          username: 'Benoit',
          displayName: 'Sepe',
        },
      ]);

      //PATCH User
      await request(app.getHttpServer())
        .patch(`/users/${user2.username}`)
        .send({ displayName: 'BenoitSepe' })
        .expect(200);
      //Check return value
      const retrievedUpdatedUser = await request(app.getHttpServer())
        .get(`/users/${user2.username}`)
        .expect(200);
      expect(retrievedUpdatedUser.body).toEqual(
        Object.assign({}, user2, { displayName: 'BenoitSepe' }),
      );

      //DELETE Users
      await request(app.getHttpServer()).delete(`/users/${user1.username}`).expect(200);
      await request(app.getHttpServer()).delete(`/users/${user2.username}`).expect(200);

      //Check deletion
      const { body: finalUsers } = await request(app.getHttpServer()).get(`/users`).expect(200);
      expect(finalUsers).toEqual([]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
