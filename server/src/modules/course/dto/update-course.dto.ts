import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(
  OmitType(CreateCourseDto, ['instructor'] as const),
) {}
{
}
