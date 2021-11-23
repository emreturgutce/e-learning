import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddCourseSectionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  section_contents: string[];
}
