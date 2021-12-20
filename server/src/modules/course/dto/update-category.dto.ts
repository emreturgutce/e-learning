import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 255)
  name: string;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;
}
