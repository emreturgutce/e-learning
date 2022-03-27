import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateExamDto {
  @ApiProperty()
  @IsArray()
  questions: string[];
}
