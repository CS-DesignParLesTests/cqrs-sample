import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BooksModule } from './books.module';
import { Book } from './entities/book.entity';

describe('Core app', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        BooksModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'database',
          port: 3306,
          username: 'nestjs',
          password: 'nestjs',
          database: 'demonestjs',
          entities: [Book],
          synchronize: false,
          retryAttempts: 5,
          retryDelay: 5000,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    connection = app.get(Connection);
  });

  describe('Books', () => {
    describe('/GET books', () => {
      /*
      it('should return an array of books from initial database', async () => {
        const response = await request(app.getHttpServer()).get('/books').expect(200);

        expect(response.body).toEqual([
          {
            id: 'bc5722e6-2d22-4516-a8a4-4ffe90ce8ebb',
            title: "Fate/Stay Night Heaven's Feel",
            author: 'Taskohna',
          },
          {
            id: 'bc5722e6-2d22-4516-a8a4-4ffe90ce8ecc',
            title: 'Prison School',
            author: 'Hiramoto, Akira',
          },
          {
            id: 'bc5722e6-2d22-4516-a8a4-4ffe90ce8edd',
            title: 'Dragon Ball Super',
            author: 'Toriyama, Akira',
          },
        ]);
      });
      */

      it('should return an array of books from current test pre-population', async () => {
        // Pre-populate DB with a dummy book
        await connection
          .createQueryBuilder()
          .insert()
          .into(Book)
          .values([
            {
              id: 'bc5724f7-2d22-4516-a8a4-4ffe90ce8ebb',
              title: 'Platinum End',
              author: 'Tsugumi, Ohba',
            },
          ])
          .execute();

        // Run e2e test
        const { body } = await request(app.getHttpServer())
          .get('/books/bc5724f7-2d22-4516-a8a4-4ffe90ce8ebb')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(body).toEqual({
          id: 'bc5724f7-2d22-4516-a8a4-4ffe90ce8ebb',
          title: 'Platinum End',
          author: 'Tsugumi, Ohba',
        });
      });
    });

    describe('/POST books', () => {
      it('should return sent data', async () => {
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
      });
    });

    describe('/DELETE books', () => {
      it('should return true', async () => {
        const data = {
          id: 'bc5724f7-2d22-4516-a8a4-4ffe70ce8ebb',
          title: 'Noragami',
          author: 'Adachitoka',
        };
        // Pre-populate DB with a dummy book
        await connection.createQueryBuilder().insert().into(Book).values(data).execute();

        return request(app.getHttpServer()).delete(`/books/${data.id}`).expect(200);
      });
    });

    describe('/PATCH books', () => {
      it('should return modified book', async () => {
        const data = {
          id: 'bc5724f7-2d22-4516-b5f7-4ffe70ce8ebb',
          title: 'Fuka',
          author: 'Kouji, Seo',
        };
        // Pre-populate DB with a dummy book
        await connection.createQueryBuilder().insert().into(Book).values(data).execute();

        await request(app.getHttpServer())
          .patch(`/books/${data.id}`)
          .send({
            title: 'Fûka',
          })
          .expect(200);

        /* const book = await connection
          .getRepository(Book)
          .createQueryBuilder('book')
          .where('book.id = :id', { id: 'bc5724f7-2d22-4516-b5f7-4ffe70ce8ebb' })
          .getOne();
          */

        //TODO replace by above code which add two undefined Symbols()
        const book = await request(app.getHttpServer())
          .get(`/books/${data.id}`)
          .set('Accept', 'application/json');

        expect(book.body).toEqual({ ...data, title: 'Fûka' });
      });
    });

    afterEach(async () => {
      await connection.createQueryBuilder().delete().from(Book).execute();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
