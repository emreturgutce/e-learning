import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseSectionDto {
  @ApiProperty()
  @IsString({ message: 'Title field must be string.' })
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsOptional()
  section_contents: string[];
}
