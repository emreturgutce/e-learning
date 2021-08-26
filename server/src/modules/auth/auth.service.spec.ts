import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserType } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let createUser: jest.Mock;
  let getUserByEmail: jest.Mock;
  let comparePasswords: jest.Mock;

  beforeEach(async () => {
    createUser = jest.fn();
    getUserByEmail = jest.fn();
    comparePasswords = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            createUser,
            getUserByEmail,
            comparePasswords,
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('CreateUser method', () => {
    it('Should create user', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Emre',
        lastname: 'Turgut',
        email: 'emre@mail.com',
        password: '123456',
        type: UserType.USER,
      };

      createUser.mockResolvedValueOnce(createUserDto);

      const res = await authService.createUser(createUserDto);

      expect(res).toBeDefined();
      expect(res.firstname).toEqual(createUserDto.firstname);
      expect(res.lastname).toEqual(createUserDto.lastname);
      expect(res.email).toEqual(createUserDto.email);
      expect(res.type).toEqual(createUserDto.type);
    });

    it('Should throw bad request error when tried to create user with existing email', async () => {
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

      await expect(authService.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('Login method', () => {
    it('Should login user', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      getUserByEmail.mockResolvedValueOnce(loginUserDto);
      comparePasswords.mockResolvedValueOnce(true);

      const res = await authService.login(loginUserDto);

      expect(res).toBeDefined();
      expect(res.email).toEqual(loginUserDto.email);
    });

    it('Should throw unauthorized error when getUserByEmail method returned null', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      getUserByEmail.mockResolvedValueOnce(null);
      comparePasswords.mockResolvedValueOnce(true);

      await expect(authService.login(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('Should throw unauthorized error when comparePasswords method returned false', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      getUserByEmail.mockResolvedValueOnce(loginUserDto);
      comparePasswords.mockResolvedValueOnce(false);

      await expect(authService.login(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
