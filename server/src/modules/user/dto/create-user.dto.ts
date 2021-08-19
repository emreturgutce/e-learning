import { IsEmail, IsEnum, Length } from 'class-validator';
import { UserType } from '../schema/user.schema';

export class CreateUserDto {
  @Length(0, 128)
  firstname: string;

  @Length(0, 128)
  lastname: string;

  @IsEmail()
  email: string;

  @Length(6)
  password: string;

  @IsEnum(UserType)
  type: UserType;
}
