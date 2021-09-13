import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Session as SessionDoc } from 'express-session';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { CourseService } from './course.service';
import { AddReviewToCourseDto } from './dto/add-review-to-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly logger: Logger,
  ) {}

  @Get()
  public async getCourses() {
    const courses = await this.courseService.getCourses();

    this.logger.log('Courses fetched', CourseController.name);

    return {
      message: 'Courses fetched',
      data: { courses },
    };
  }

  @Post()
  @Roles('INSTRUCTOR')
  public async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Session() session: SessionDoc,
  ) {
    const course = await this.courseService.createCourse({
      ...createCourseDto,
      instructor: session.context.id,
    });

    this.logger.log(
      `Course created [courseId: ${course._id}]`,
      CourseController.name,
    );

    return {
      message: 'Course created',
      data: { course },
    };
  }

  @Put(':id')
  @Roles('INSTRUCTOR')
  public async updateCourse(
    @Body() updateCourseDto: UpdateCourseDto,
    @Param('id') id: string,
    @Session() session: SessionDoc,
  ) {
    const isOwner = await this.courseService.isOwnerOfCourse(
      session.context.id,
      id,
    );

    if (!isOwner) {
      throw new ForbiddenException('Not owner of the course');
    }

    const course = await this.courseService.updateCourse(id, updateCourseDto);

    this.logger.log(
      `Course updated [courseId: ${course._id}]`,
      CourseController.name,
    );

    return {
      message: 'Course updated',
      data: { course },
    };
  }

  // TODO! Will be removed, increment this after course purchase instead
  @Put(':id/increment/:inc')
  @Roles('INSTRUCTOR')
  public async incrementTotalStudents(
    @Param('id') id: string,
    @Param('inc') inc: string,
  ) {
    const course = await this.courseService.incrementTotalStudent(
      id,
      Number(inc),
    );

    this.logger.log(
      `Course updated [courseId: ${course._id}]`,
      CourseController.name,
    );

    return {
      message: 'Course updated',
      data: { course },
    };
  }

  @Post(':id/thumbnail')
  @Roles('INSTRUCTOR')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, { mimetype }, cb) => {
        if (mimetype.includes('image')) {
          return cb(null, true);
        }
        return cb(new BadRequestException('File type must be image'), false);
      },
      limits: { fileSize: 1_000_000 },
    }),
  )
  public async uploadThumbnail(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Session() session: SessionDoc,
  ) {
    const isOwner = await this.courseService.isOwnerOfCourse(
      session.context.id,
      id,
    );

    if (!isOwner) {
      throw new ForbiddenException('Not owner of the course');
    }

    const course = await this.courseService.uploadCourseThumbnail(
      id,
      file.buffer,
    );

    this.logger.log(
      `Course thumbnail uploaded [courseId: ${id}]`,
      CourseController.name,
    );

    return {
      message: 'Course thumbnail uploaded',
      data: { course },
    };
  }

  @Post(':id/reviews')
  public async addReviewToCourse(
    @Param('id') id: string,
    @Session() session: SessionDoc,
    @Body() addReviewToCourseDto: Omit<AddReviewToCourseDto, 'user'>,
  ) {
    const isBought = await this.courseService.didBuyTheCourse(
      session.context.id,
      id,
    );

    if (!isBought) {
      throw new ForbiddenException('Not bought the course');
    }

    const course = await this.courseService.addReviewToCourse(id, {
      ...addReviewToCourseDto,
      user: session.context.id,
    });

    this.logger.log(
      `Review added to course [courseId: ${course._id}]`,
      CourseController.name,
    );

    return {
      message: 'Review added to course',
      data: { course },
    };
  }
}
