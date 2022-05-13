import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PurchaseCourseDto {
  @ApiProperty()
  @IsArray()
  ids: Array<string>;
}
