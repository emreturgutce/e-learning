import {
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserType } from '../user/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let createUser: jest.Mock;
  let login: jest.Mock;
  let validateUser: jest.Mock;
  let log: jest.Mock;

  beforeEach(async () => {
    createUser = jest.fn();
    login = jest.fn();
    validateUser = jest.fn();
    log = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createUser,
            login,
            validateUser,
          },
        },
        {
          provide: Logger,
          useValue: {
            log,
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('CreateUser method', () => {
    it('should signup user', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Emre',
        lastname: 'Turgut',
        email: 'emre@mail.com',
        password: '123456',
        type: UserType.USER,
      };

      createUser.mockResolvedValueOnce(createUserDto);

      const res = await controller.createUser(createUserDto);

      successCaseBaseAssertion(res);
      expect(res.data).toHaveProperty('user');
      expect(res.message).toEqual('User created');
      expect(res.data.user).toEqual(createUserDto);
    });

    it('should throw bad request error when createUser throwed bad request error', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Emre',
        lastname: 'Turgut',
        email: 'emre@mail.com',
        password: '123456',
        type: UserType.USER,
      };

      createUser.mockRejectedValueOnce(
        new BadRequestException('User with the given email already exists'),
      );

      await expect(controller.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('Login method', () => {
    it('should login user', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@test.com',
        password: '123456',
      };
      const session = {};

      login.mockResolvedValue(loginUserDto);

      const res = await controller.login(loginUserDto, session as Session);

      successCaseBaseAssertion(res);
      expect(res.data).toHaveProperty('user');
      expect(res.message).toEqual('Logged in');
      expect(res.data.user.email).toEqual(loginUserDto.email);
    });

    it('should throw unauthorized error when authService.login method throwed unauthorized error', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@test.com',
        password: '123456',
      };
      const session = {};

      login.mockRejectedValue(
        new UnauthorizedException(
          `User could not found with the given email [${loginUserDto.email}]`,
        ),
      );

      await expect(
        controller.login(loginUserDto, session as Session),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('GetCsrfToken method', () => {
    it('should get csrf token', () => {
      const csrfToken = Buffer.from(
        String(Math.floor(Math.random() * 10000000)),
      ).toString('base64');
      const req = {
        csrfToken: () => csrfToken,
      };
      const res = {
        cookie: jest.fn(),
      };

      const response = controller.getCsrfToken(
        req as Request,
        res as unknown as Response,
      );

      successCaseBaseAssertion(response);
      expect(response.data).toHaveProperty('csrf');
      expect(response.message).toEqual('Csrf token set to cookie');
      expect(response.data.csrf).toEqual(csrfToken);
    });
  });
});
