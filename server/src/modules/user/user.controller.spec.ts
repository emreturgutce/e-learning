import { Test, TestingModule } from '@nestjs/testing';
import { UserDocument } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let getUsers: jest.Mock;

  beforeEach(async () => {
    getUsers = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers,
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('GetUsers', () => {
    it('should get all users', async () => {
      const users: Partial<UserDocument>[] = [
        {
          id: '1',
          email: 'test@test.com',
        },
        {
          id: '2',
          email: 'test2@test.com',
        },
      ];

      getUsers.mockResolvedValueOnce(users);

      const res = await controller.getUsers();

      successCaseBaseAssertion({ body: res });
      expect(res.data).toHaveProperty('users');
      expect(res.message).toEqual('Users fetched');
      expect(res.data.users).toEqual(users);
    });
  });
});
