import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import request, { Response } from 'supertest';
import { SIGNUP_ENDPOINT } from './utils';

global.successCaseBaseAssertion = ({ body }: Response): void => {
  expect(body).toBeDefined();
  expect(body).toHaveProperty('message');
  expect(body).toHaveProperty('data');
};

global.errorCaseAssertion = ({ body }: Response): void => {
  expect(body).toBeDefined();
  expect(body).toHaveProperty('statusCode');
  expect(body).toHaveProperty('message');
  expect(body).toHaveProperty('timestamp');
  expect(body).toHaveProperty('path');
};

global.createTestUser = async (
  app: INestApplication,
): Promise<CreateUserDto> => {
  const createUserDto: CreateUserDto = {
    firstname: 'Emre',
    lastname: 'Turgut',
    email: 'emre@mail.com',
    password: '123456',
    type: 'USER' as any,
  };

  await request(app.getHttpServer()).post(SIGNUP_ENDPOINT).send(createUserDto);

  return createUserDto;
};
