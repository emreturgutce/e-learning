import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator';
import { UserType } from '../schema/user.schema';

export class CreateUserDto {
  @ApiProperty({ minLength: 0, maxLength: 128, required: false })
  @Length(0, 128)
  @IsOptional()
  firstname: string;

  @ApiProperty({ minLength: 0, maxLength: 128, required: false })
  @Length(0, 128)
  @IsOptional()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6 })
  @Length(6)
  password: string;

  @ApiProperty({ enum: UserType, required: false })
  @IsEnum(UserType)
  @IsOptional()
  type: UserType;
}
