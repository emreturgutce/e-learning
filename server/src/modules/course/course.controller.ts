import { Controller, Get } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getCourses() {
    return this.courseService.getCourses();
  }

  @Get('create')
  createCourse() {
    return this.courseService.createCourse();
  }
}
