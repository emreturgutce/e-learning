import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from '../schema/question.schema';
import { Type } from 'class-transformer';

class CreateExam {
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

  @ApiProperty()
  @IsNumber()
  point: number;
}

export class CreateExamV2Dto {
  @ApiProperty({ type: [CreateExam] })
  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CreateExam)
  questions!: CreateExam[];

  owner: string;
}
