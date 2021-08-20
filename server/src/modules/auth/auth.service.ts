import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
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
        `User could not found with the given email [${email}]`,
      );
    }

    const isMatch = await this.comparePasswords(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(`Wrong password for user [${user._id}]`);
    }

    return user;
  }

  public async validateUser({
    email,
    password,
  }: LoginUserDto): Promise<boolean> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return false;
    }

    const isMatch = await this.comparePasswords(password, user.password);

    if (!isMatch) {
      return false;
    }

    return true;
  }

  private comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
