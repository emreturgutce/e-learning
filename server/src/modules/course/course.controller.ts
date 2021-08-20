import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { CourseService } from './course.service';

@Controller('courses')
@UseGuards(AuthGuard)
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
