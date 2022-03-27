import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { QuestionType } from '../schema/question.schema';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  text: string;

  @ApiProperty({ enum: QuestionType, required: false })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty()
  @IsArray()
  options: string[];

  @ApiProperty()
  @IsString()
  answer: string;

  owner: string;

  @ApiProperty()
  @IsNumber()
  point: number;
}
