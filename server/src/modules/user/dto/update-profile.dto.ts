import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ minLength: 0, maxLength: 128, required: false })
  @Length(0, 128)
  @IsOptional()
  firstname?: string;

  @ApiProperty({ minLength: 0, maxLength: 128, required: false })
  @Length(0, 128)
  @IsOptional()
  lastname?: string;
}
