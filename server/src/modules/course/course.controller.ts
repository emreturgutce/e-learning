import {
  BadRequestException,
  Body,
  Controller,
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
import { AuthGuard } from 'src/common/guard/auth.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
@UseGuards(AuthGuard)
@ApiTags('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getCourses() {
    return this.courseService.getCourses();
  }

  // TODO! Only instructors
  @Post()
  public async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Session() session: SessionDoc,
  ) {
    const course = await this.courseService.createCourse({
      ...createCourseDto,
      instructor: session.context.id,
    });

    this.logger.log(`Course created [${course._id}]`);

    return {
      message: 'Course created',
      data: { course },
    };
  }

  // TODO! Only owner
  @Put(':id')
  public async updateCourse(
    @Body() updateCourseDto: UpdateCourseDto,
    @Param('id') id: string,
  ) {
    const course = await this.courseService.updateCourse(id, updateCourseDto);

    this.logger.log(`Course updated [${course._id}]`);

    return {
      message: 'Course updated',
      data: { course },
    };
  }

  @Put(':id/increment/:inc')
  public async incrementTotalStudents(
    @Param('id') id: string,
    @Param('inc') inc: string,
  ) {
    const course = await this.courseService.incrementTotalStudent(
      id,
      Number(inc),
    );

    this.logger.log(`Course updated [${course._id}]`);

    return {
      message: 'Course updated',
      data: { course },
    };
  }

  @Post(':id/thumbnail')
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
  ) {
    const course = await this.courseService.uploadCourseThumbnail(
      id,
      file.buffer,
    );

    this.logger.log(`Course thumbnail uploaded [${id}]`);

    return {
      message: 'Course thumbnail uploaded',
      data: { course },
    };
  }
}
