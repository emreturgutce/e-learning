import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ minLength: 6 })
  @Length(6)
  password: string;
}
