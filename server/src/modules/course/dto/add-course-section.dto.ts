import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class AddCourseSectionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  section_contents: string[];

  @ApiProperty()
  @IsNumber()
  order: number;
}
