import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Redis } from 'ioredis';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import cookieParser from 'cookie-parser';
import { RedisService } from 'src/providers/redis/redis.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MongoProviderModule } from 'src/providers/mongo/provider.module';
import { RedisModule } from 'src/providers/redis/redis.module';
import { session } from 'src/common/middleware/session.middleware';
import { SESSION_SECRET } from 'src/config';
import { LoginUserDto } from 'src/modules/auth/dto/login-user.dto';
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from './utils';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let redis: Redis;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, MongoProviderModule, RedisModule],
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

  describe('CreateUser', () => {
    const createUserDto: CreateUserDto = {
      firstname: 'Emre',
      lastname: 'Turgut',
      email: 'emre@mail.com',
      password: '123456',
      type: 'USER' as any,
    };

    it('should create user', () => {
      return request(app.getHttpServer())
        .post(SIGNUP_ENDPOINT)
        .send(createUserDto)
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          const { body } = res;
          successCaseBaseAssertion(res);
          expect(body.data).toHaveProperty('user');
          expect(body.message).toEqual('User created');
          expect(body.data.user._id).toBeDefined();
          expect(body.data.user.firstname).toEqual(createUserDto.firstname);
          expect(body.data.user.email).toEqual(createUserDto.email);
        });
    });

    it('should return bad request for existing email', async () => {
      const user = await createTestUser(app);

      await request(app.getHttpServer())
        .post(SIGNUP_ENDPOINT)
        .send(user)
        .expect(HttpStatus.BAD_REQUEST)
        .expect(errorCaseAssertion);
    });

    it('should return bad request for invalid email', () => {
      return request(app.getHttpServer())
        .post(SIGNUP_ENDPOINT)
        .send({
          ...createUserDto,
          email: 'emremail.com',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect(errorCaseAssertion);
    });
  });

  describe('Login', () => {
    const loginUserDto: LoginUserDto = {
      email: 'emre@mail.com',
      password: '123456',
    };

    it('should login', async () => {
      const user = await createTestUser(app);

      await request(app.getHttpServer())
        .post(LOGIN_ENDPOINT)
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(HttpStatus.OK)
        .expect((res) => {
          const { body, headers } = res;

          const cookies = headers['set-cookie'] as string[];
          const sessionCookie = cookies.find((val) =>
            val.startsWith('session_token='),
          );

          successCaseBaseAssertion(res);
          expect(body.data).toHaveProperty('user');
          expect(body.message).toEqual('Logged in');
          expect(body.data.user._id).toBeDefined();
          expect(body.data.user.firstname).toEqual(user.firstname);
          expect(body.data.user.email).toEqual(user.email);
          expect(cookies).toBeDefined();
          expect(sessionCookie).toBeDefined();
        });
    });

    it('should return unauthorized for non-existing user', async () => {
      await request(app.getHttpServer())
        .post(LOGIN_ENDPOINT)
        .send(loginUserDto)
        .expect(HttpStatus.UNAUTHORIZED)
        .expect(errorCaseAssertion);
    });

    it('should return bad request for invalid email', async () => {
      await request(app.getHttpServer())
        .post(LOGIN_ENDPOINT)
        .send({
          ...loginUserDto,
          email: 'emremail.com',
        })
        .expect(HttpStatus.BAD_REQUEST)
        .expect(errorCaseAssertion);
    });
  });
});
