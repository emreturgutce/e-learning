import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateExamDto {
  @ApiProperty()
  @IsArray()
  questions: string[];

  owner: string;
}
