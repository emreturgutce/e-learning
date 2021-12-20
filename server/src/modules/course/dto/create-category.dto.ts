import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  name: string;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;
}
