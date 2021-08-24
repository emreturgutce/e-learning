import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  instructor: string;

  @ApiProperty()
  @IsOptional()
  categories: string[];

  @ApiProperty()
  @IsOptional()
  preview: string;

  @ApiProperty()
  @IsOptional()
  thumbnail: string;
}
