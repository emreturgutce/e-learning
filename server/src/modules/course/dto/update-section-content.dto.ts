import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ContentType } from '../schema/section-content.schema';

export class UpdateSectionContentDto {
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  @IsOptional()
  title: string;

  @ApiProperty({ enum: ContentType, required: false })
  @IsEnum(ContentType)
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  video_url: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  text: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  duration: number;

  @ApiProperty()
  @IsOptional()
  questions: string[];
}
