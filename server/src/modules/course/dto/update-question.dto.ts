import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { QuestionType } from '../schema/question.schema';

export class UpdateQuestionDto {
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  text: string;

  @ApiProperty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty()
  @IsArray()
  options: string[];

  @ApiProperty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsNumber()
  point: number;
}
