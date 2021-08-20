import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserType } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            createUser: (createUserDto: CreateUserDto) => createUserDto,
            login: (loginUserDto: LoginUserDto) => loginUserDto,
            validateUser: () => true,
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should create user', async () => {
    const createUserDto: CreateUserDto = {
      firstname: 'Emre',
      lastname: 'Turgut',
      email: 'emre@mail.com',
      password: '123456',
      type: UserType.USER,
    };

    const res = await authService.createUser(createUserDto);

    expect(res).toBeDefined();
    expect(res.firstname).toEqual(createUserDto.firstname);
    expect(res.lastname).toEqual(createUserDto.lastname);
    expect(res.email).toEqual(createUserDto.email);
    expect(res.type).toEqual(createUserDto.type);
  });
});
