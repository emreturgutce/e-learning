import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { compare } from 'bcryptjs';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User, UserType } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

jest.mock('bcryptjs');

describe('AuthService Integration', () => {
  let authService: AuthService;
  let userService: UserService;
  let exec: jest.Mock;
  let create: jest.Mock;
  const mockUserModel = {
    findOne: () => ({ exec }),
    findById: () => ({ exec }),
    find: () => ({ exec }),
  };
  let bcryptCompare: jest.Mock;

  beforeEach(async () => {
    exec = jest.fn();
    create = jest.fn();
    bcryptCompare = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (compare as jest.Mock) = bcryptCompare;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            ...mockUserModel,
            create,
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('CreateUser method', () => {
    it('should create user', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Emre',
        lastname: 'Turgut',
        email: 'emre@mail.com',
        password: '123456',
        type: UserType.USER,
      };

      const getUserByEmailSpy = jest.spyOn(userService, 'getUserByEmail');
      const createUserSpy = jest.spyOn(userService, 'createUser');
      exec.mockResolvedValueOnce(null);
      create.mockResolvedValueOnce(createUserDto);

      const res = await authService.createUser(createUserDto);

      expect(res).toBeDefined();
      expect(res.firstname).toEqual(createUserDto.firstname);
      expect(res.lastname).toEqual(createUserDto.lastname);
      expect(res.email).toEqual(createUserDto.email);
      expect(res.type).toEqual(createUserDto.type);
      expect(getUserByEmailSpy).toBeCalledTimes(1);
      expect(createUserSpy).toBeCalledTimes(1);
    });

    it('should throw bad request error when userService.createUser method throwed', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Emre',
        lastname: 'Turgut',
        email: 'emre@mail.com',
        password: '123456',
        type: UserType.USER,
      };

      const getUserByEmailSpy = jest.spyOn(userService, 'getUserByEmail');
      exec.mockResolvedValueOnce(createUserDto);
      create.mockResolvedValueOnce(createUserDto);

      await expect(authService.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );

      expect(getUserByEmailSpy).toBeCalledTimes(1);
    });
  });

  describe('Login method', () => {
    it('should login user', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      exec.mockResolvedValueOnce(loginUserDto);
      bcryptCompare.mockResolvedValueOnce(true);

      const res = await authService.login(loginUserDto);

      expect(res).toBeDefined();
      expect(res).toEqual(loginUserDto);
    });

    it('should throw unauthorized error when userService.getUserByEmail method returned null', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      exec.mockResolvedValueOnce(null);
      bcryptCompare.mockResolvedValueOnce(true);

      await expect(authService.login(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw unauthorized error when userService.comparePasswords method returned false', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      exec.mockResolvedValueOnce(loginUserDto);
      bcryptCompare.mockResolvedValueOnce(false);

      await expect(authService.login(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('ValidateUser method', () => {
    it('should validate user', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      exec.mockResolvedValueOnce(loginUserDto);
      bcryptCompare.mockResolvedValueOnce(true);

      const res = await authService.validateUser(loginUserDto);

      expect(res).toBeDefined();
      expect(res).toEqual(true);
    });

    it('should return false when getUserByEmail method returned null', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      exec.mockResolvedValueOnce(null);
      bcryptCompare.mockResolvedValueOnce(true);

      const res = await authService.validateUser(loginUserDto);

      expect(res).toBeDefined();
      expect(res).toEqual(false);
    });

    it('should return false when comparePasswords method returned false', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'emre@mail.com',
        password: '123456',
      };

      exec.mockResolvedValueOnce(loginUserDto);
      bcryptCompare.mockResolvedValueOnce(false);

      const res = await authService.validateUser(loginUserDto);

      expect(res).toBeDefined();
      expect(res).toEqual(false);
    });
  });
});
