import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator';
import { UserType } from '../schema/user.schema';

export class CreateUserDto {
  @Length(0, 128)
  @IsOptional()
  firstname: string;

  @Length(0, 128)
  @IsOptional()
  lastname: string;

  @IsEmail()
  email: string;

  @Length(6)
  password: string;

  @IsEnum(UserType)
  @IsOptional()
  type: UserType;
}
