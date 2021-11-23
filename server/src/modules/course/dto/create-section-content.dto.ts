import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ContentType } from '../schema/section-content.schema';

export class CreateSectionContentDto {
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  title: string;

  @ApiProperty({ enum: ContentType, required: false })
  @IsEnum(ContentType)
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsString()
  video_url: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  questions: string[];
}
