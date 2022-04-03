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
  @IsString()
  @IsOptional()
  exam: string;

  owner: string;
}
