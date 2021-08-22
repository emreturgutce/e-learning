import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Redis } from 'ioredis';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { RedisService } from 'src/providers/redis/redis.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MongoProviderModule } from 'src/providers/mongo/provider.module';
import { RedisModule } from 'src/providers/redis/redis.module';

describe('AppController (e2e)', () => {
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

    await app.init();
  });

  beforeEach(async () => {
    await connection.dropDatabase();
  });

  afterAll(async () => {
    await connection.close();
    redis.disconnect();
    await app.close();
  });

  describe('CreateUser', () => {
    it('should create user', () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Emre',
        lastname: 'Turgut',
        email: 'emre@mail.com',
        password: '123456',
        type: 'USER' as any,
      };

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toBeDefined();
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('data');
          expect(body.data).toHaveProperty('user');
          expect(body.message).toEqual('User created');
          expect(body.data.user._id).toBeDefined();
          expect(body.data.user.firstname).toEqual(createUserDto.firstname);
          expect(body.data.user.email).toEqual(createUserDto.email);
        });
    });

    it('should return bad request when tried to create user with existing email', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Emre',
        lastname: 'Turgut',
        email: 'emre@mail.com',
        password: '123456',
        type: 'USER' as any,
      };

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto);

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toBeDefined();
          expect(body).toHaveProperty('statusCode');
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('timestamp');
          expect(body).toHaveProperty('path');
        });
    });
  });
});
