import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDocument } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userService.createUser(createUserDto);
  }

  public async login({ email, password }: LoginUserDto): Promise<UserDocument> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        `User could not found with the given email [email: ${email}]`,
      );
    }

    const isMatch = await this.userService.comparePasswords(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException(
        `Wrong password for user [email: ${email}]`,
      );
    }

    return user;
  }

  public async changePassword(userId: string, password: string) {
    return this.userService.changePassword(userId, password);
  }
}
