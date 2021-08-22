import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserType } from './schema/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let exec: jest.Mock;
  let create: jest.Mock;
  const mockUserModel = {
    findOne: () => ({ exec }),
    findById: () => ({ exec }),
    find: () => ({ exec }),
  };

  beforeEach(async () => {
    exec = jest.fn();
    create = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<UserService>(UserService);
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

      create.mockResolvedValueOnce(createUserDto);
      exec.mockResolvedValueOnce(null);

      const res = await service.createUser(createUserDto);

      expect(res).toBeDefined();
      expect(res.firstname).toEqual(createUserDto.firstname);
      expect(res.lastname).toEqual(createUserDto.lastname);
      expect(res.email).toEqual(createUserDto.email);
      expect(res.password).toEqual(createUserDto.password);
      expect(res.type).toEqual(createUserDto.type);
    });

    it('should throw bad request when getUserByEmail method returned user', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'Emre',
        lastname: 'Turgut',
        email: 'emre@mail.com',
        password: '123456',
        type: UserType.USER,
      };

      create.mockResolvedValueOnce(createUserDto);
      exec.mockResolvedValueOnce(createUserDto);

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('GetUsers method', () => {
    it('should get users', async () => {
      const users = [
        {
          _id: '1',
        },
        {
          _id: '2',
        },
      ];

      exec.mockResolvedValueOnce(users);

      const res = await service.getUsers();

      expect(res).toBeDefined();
      expect(res).toEqual(users);
    });
  });

  describe('GetUserByEmail method', () => {
    it('should get user by email', async () => {
      const user = { _id: '1', email: 'emre@mail.com' };

      exec.mockResolvedValueOnce(user);

      const res = await service.getUserByEmail(user.email);

      expect(res).toBeDefined();
      expect(res).toEqual(user);
    });
  });

  describe('FindUserById method', () => {
    it('should get user by email', async () => {
      const user = { _id: '1', email: 'emre@mail.com' };

      exec.mockResolvedValueOnce(user);

      const res = await service.findUserById(user._id);

      expect(res).toBeDefined();
      expect(res).toEqual(user);
    });
  });
});
