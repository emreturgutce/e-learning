import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Session,
  UnauthorizedException,
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
import { AddCourseSectionDto } from './dto/add-course-section.dto';
import { AddReviewToCourseDto } from './dto/add-review-to-course.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateSectionContentDto } from './dto/create-section-content.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateCourseSectionDto } from './dto/update-course-section.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateSectionContentDto } from './dto/update-section-content.dto';

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

  @Get('list-purchased-courses')
  @Roles('USER')
  public async listPurchasedCourses(@Session() session: SessionDoc) {
    const courses = await this.courseService.listPurchasedCourses(
      session.context.id,
    );

    this.logger.log('Courses fetched', CourseController.name);

    return {
      message: 'Courses fetched',
      data: courses,
    };
  }

  @Get('list-instructors-courses')
  @Roles('INSTRUCTOR')
  public async listInstructorsCourses(@Session() session: SessionDoc) {
    const courses = await this.courseService.listInstructorsCourses(
      session.context.id,
    );

    this.logger.log('Courses fetched', CourseController.name);

    return {
      message: 'Courses fetched',
      data: courses,
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

  @Post(':courseId/:courseContentId/sections')
  @Roles('INSTRUCTOR')
  public async addCourseSection(
    @Param('courseContentId') courseContentId: string,
    @Param('courseId') courseId: string,
    @Body() addCourseSectionDto: AddCourseSectionDto,
    @Session() session: SessionDoc,
  ) {
    const { id: userId } = session.context;

    const isOwner = await this.courseService.isOwnerOfCourse(userId, courseId)

    if (!isOwner) {
      throw new UnauthorizedException("You need to be owner of this course to edit its contents.")
    }

    const courseContent = await this.courseService.addCourseSection(
      courseContentId,
      addCourseSectionDto,
    );

    this.logger.log(
      `Course content updated [courseContentId: ${courseContent._id}]`,
    );

    return {
      message: 'Course content updated',
      data: { courseContent },
    };
  }

  @Put(':courseId/:courseContentId/sections/:sectionId')
  @Roles('INSTRUCTOR')
  public async updateCourseSection(
    @Param('courseContentId') courseContentId: string,
    @Param('sectionId') sectionId: string,
    @Body() updateCourseSectionDto: UpdateCourseSectionDto,
    @Param('courseId') courseId: string,
    @Session() session: SessionDoc,
  ) {
    const { id: userId } = session.context;

    const isOwner = await this.courseService.isOwnerOfCourse(userId, courseId)

    if (!isOwner) {
      throw new UnauthorizedException("You need to be owner of this course to edit its contents.")
    }

    const courseSection = await this.courseService.updateCourseSection(
      courseContentId,
      sectionId,
      updateCourseSectionDto,
    );

    this.logger.log(
      `Course section updated [courseSectionId: ${courseSection._id}]`,
    );

    return {
      message: 'Course section updated',
      data: { courseSection },
    };
  }

  @Post('section-contents')
  @Roles('INSTRUCTOR')
  public async createSectionContent(
    @Body() createSectionContentDto: CreateSectionContentDto,
  ) {
    const sectionContent = await this.courseService.createSectionContent(
      createSectionContentDto,
    );

    this.logger.log(
      `Section content created [sectionContentId: ${sectionContent._id}]`,
    );

    return {
      message: 'Section content created',
      data: { sectionContent },
    };
  }

  @Put(':courseId/section-contents/:sectionContentId')
  @Roles('INSTRUCTOR')
  public async updateSectionContent(
    @Param('sectionContentId') sectionContentId: string,
    @Body() updateSectionContentDto: UpdateSectionContentDto,
    @Param('courseId') courseId: string,
    @Session() session: SessionDoc,
  ) {
    const { id: userId } = session.context;

    const isOwner = await this.courseService.isOwnerOfCourse(userId, courseId)

    if (!isOwner) {
      throw new UnauthorizedException("You need to be owner of this course to edit its contents.")
    }

    const sectionContent = await this.courseService.updateSectionContent(
      sectionContentId,
      updateSectionContentDto,
    );

    this.logger.log(
      `Section content updated [sectionContentId: ${sectionContent._id}]`,
    );

    return {
      message: 'Section content updated',
      data: { sectionContent },
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

  @Get('list-categories')
  public async listCategories() {
    const categories = await this.courseService.listCategories();

    return {
      message: 'Category listed',
      data: { categories },
    };
  }

  @Post('create-category')
  @Roles('ADMIN')
  public async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.courseService.createCategory(createCategoryDto);

    this.logger.log(
      `Category created [categoryId: ${category._id}]`,
      CourseController.name,
    );

    return {
      message: 'Category created',
      data: { category },
    };
  }

  @Put('update-category/:id')
  @Roles('ADMIN')
  public async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') categoryId: string,
  ) {
    const category = await this.courseService.updateCategory(
      categoryId,
      updateCategoryDto,
    );

    this.logger.log(
      `Category updated [categoryId: ${category._id}]`,
      CourseController.name,
    );

    return {
      message: 'Category updated',
      data: { category },
    };
  }

  @Delete('delete-category/:id')
  public async deleteCategory(@Param('id') categoryId: string) {
    await this.courseService.deleteCategory(categoryId);

    this.logger.log(
      `Category deleted [categoryId: ${categoryId}]`,
      CourseController.name,
    );

    return {
      message: 'Category deleted',
      data: {},
    };
  }

  @Get('purchase-course/:id')
  @Roles('USER')
  public async purchaseCourse(
    @Param('id') courseId: string,
    @Session() session: SessionDoc,
  ) {
    const { id: userId } = session.context;

    await this.courseService.purchaseCourse(userId, courseId);

    this.logger.log(
      `Course purchased [courseId: ${courseId}] by user [userId: ${userId}]`,
      CourseController.name,
    );

    return {
      message: 'Course purchased',
      data: {},
    };
  }

  @Get('refund-course/:id')
  @Roles('USER')
  public async refundCourse(
    @Param('id') courseId: string,
    @Session() session: SessionDoc,
  ) {
    const { id: userId } = session.context;

    await this.courseService.refundCourse(userId, courseId);

    this.logger.log(
      `Course refunded [courseId: ${courseId}] by user [userId: ${userId}]`,
      CourseController.name,
    );

    return {
      message: 'Course refunded',
      data: {},
    };
  }
}
