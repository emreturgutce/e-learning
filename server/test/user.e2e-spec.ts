import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Redis } from 'ioredis';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import cookieParser from 'cookie-parser';
import { RedisService } from 'src/providers/redis/redis.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { MongoProviderModule } from 'src/providers/mongo/provider.module';
import { RedisModule } from 'src/providers/redis/redis.module';
import { session } from 'src/common/middleware/session.middleware';
import { SESSION_SECRET } from 'src/config';
import { GET_USERS_ENDPOINT } from './utils';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let redis: Redis;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule, MongoProviderModule, RedisModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    redis = moduleFixture.get<RedisService>(RedisService).instance;
    connection = moduleFixture.get(getConnectionToken());

    app.use(session(redis));
    app.use(cookieParser(SESSION_SECRET));

    await app.init();
  });

  beforeEach(async () => {
    await connection.dropDatabase();
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  afterAll(async () => {
    await connection.close();
    redis.disconnect();
    await app.close();
  });

  describe('GetUsers', () => {
    it('should get all users', async () => {
      const { token } = await loginTestUser(app);

      return request(app.getHttpServer())
        .get(GET_USERS_ENDPOINT)
        .set('Cookie', token)
        .send()
        .expect(HttpStatus.OK)
        .expect((res) => {
          const { body } = res;
          successCaseBaseAssertion(res);
          expect(body.data).toHaveProperty('users');
          expect(body.message).toEqual('Users fetched');
          expect(body.data.users).toBeInstanceOf(Array);
        });
    });

    it('should return 401 Unauthorized without login user', () => {
      return request(app.getHttpServer())
        .get(GET_USERS_ENDPOINT)
        .send()
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((res) => {
          errorCaseAssertion(res);
        });
    });
  });
});
