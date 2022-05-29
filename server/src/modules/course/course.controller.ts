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
  Query,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Session as SessionDoc } from 'express-session';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { CourseService } from './course.service';
import { AddCourseSectionDto } from './dto/add-course-section.dto';
import { AddReviewToCourseDto } from './dto/add-review-to-course.dto';
import { ApproveExamDto } from './dto/approve-exam.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateSectionContentDto } from './dto/create-section-content.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateCourseSectionDto } from './dto/update-course-section.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UpdateSectionContentDto } from './dto/update-section-content.dto';
import { PurchaseCourseDto } from './dto/purchase-course.dto';
import { CreateExamV2Dto } from './dto/create-exam-v2.dto';

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

  // courses/search-courses?search=React
  @Get('search-courses')
  @ApiQuery({ name: 'search', type: 'string' })
  public async searchCourses(@Query() { search }: { search: string }) {
    const courses = await this.courseService.searchCourses(search);

    this.logger.log('Courses fetched', CourseController.name);

    return {
      message: 'Courses fetched',
      data: { courses },
    };
  }

  @Get('get-course/:id')
  @Roles('USER')
  public async getCourseById(
    @Param('id') id: string,
    @Session() session: SessionDoc,
  ) {
    const { courses } = await this.courseService.listPurchasedCourses(
      session.context.id,
    );

    const didPurchased = courses.some((course: any) => course.id === id);

    if (!didPurchased) {
      throw new ForbiddenException('You must purchase the course');
    }

    const course = await this.courseService.findCourseById(id);

    return {
      message: 'Course fetched',
      data: { course },
    };
  }

  @Get('get-course-detail/:id')
  public async getCourseDetailById(@Param('id') id: string) {
    const course = await this.courseService.findCourseDetailById(id);

    return {
      message: 'Course fetched',
      data: { course },
    };
  }

  @Post('questions/create-question')
  @Roles('INSTRUCTOR')
  public async createQuestion(
    @Body() createQuestion: CreateQuestionDto,
    @Session() session: SessionDoc,
  ) {
    const question = await this.courseService.createQuestion({
      ...createQuestion,
      owner: session.context.id,
    });

    return {
      message: 'Question created',
      data: { question },
    };
  }

  @Get('questions/list-questions')
  @Roles('INSTRUCTOR')
  public async listQuestions(@Session() session: SessionDoc) {
    const questions = await this.courseService.listQuestions(
      session.context.id,
    );

    return {
      message: 'Question created',
      data: { questions },
    };
  }

  @Delete('questions/delete-question/:questionId')
  @Roles('INSTRUCTOR')
  public async deleteQuestion(@Param('questionId') questionId: string) {
    await this.courseService.deleteQuestion(questionId);

    return {
      message: 'Question deleted',
      data: {},
    };
  }

  @Put('questions/update-question/:questionId')
  @Roles('INSTRUCTOR')
  public async updateQuestion(
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Param('questionId') questionId: string,
  ) {
    const question = await this.courseService.updateQuestion(
      questionId,
      updateQuestionDto,
    );

    return {
      message: 'Question updated',
      data: { question },
    };
  }

  @Post('exams/create-exam')
  @Roles('INSTRUCTOR')
  public async createExam(
    @Body() createExamDto: CreateExamDto,
    @Session() session: SessionDoc,
  ) {
    const exam = await this.courseService.createExam({
      ...createExamDto,
      owner: session.context.id,
    });

    return {
      message: 'Exam updated',
      data: { exam },
    };
  }

  @Post('exams/create-exam/v2')
  @Roles('INSTRUCTOR')
  public async createExamV2(
    @Body() createExamDto: CreateExamV2Dto,
    @Session() session: SessionDoc,
  ) {
    const questionIds: string[] = [];
    for await (const question of createExamDto.questions) {
      const questionDoc = await this.courseService.createQuestion({
        ...question,
        owner: session.context.id,
      });
      questionIds.push(questionDoc._id);
    }

    const exam = await this.courseService.createExam({
      questions: questionIds,
      owner: session.context.id,
    });

    return {
      message: 'Exam created.',
      data: { exam },
    };
  }

  @Put('exams/update-exam/:examId')
  @Roles('INSTRUCTOR')
  public async updateExam(
    @Body() updateExamDto: UpdateExamDto,
    @Param('examId') examId: string,
  ) {
    const exam = await this.courseService.updateExam(examId, updateExamDto);

    return {
      message: 'Exam updated',
      data: { exam },
    };
  }

  @Put('exams/complete-exam/:examId')
  @Roles('USER')
  public async completeExam(
    @Body() answers: string[],
    @Param('examId') examId: string,
    @Session() session: SessionDoc,
  ) {
    const exam = await this.courseService.completeExam(
      examId,
      session.context.id,
      answers,
    );

    return {
      message: 'Exam completed',
      data: { exam },
    };
  }

  @Post('exams/approve-exam/:examId')
  @Roles('INSTRUCTOR')
  public async approveExam(
    @Body() { point }: ApproveExamDto,
    @Param('examId') examId: string,
    @Session() session: SessionDoc,
  ) {
    const exam = await this.courseService.approveExam(
      examId,
      session.context.id,
      point,
    );

    return {
      message: 'Exam approved',
      data: { exam },
    };
  }

  @Get('exams/unapproved-exams')
  @Roles('INSTRUCTOR')
  public async getUnapprovedExams(@Session() session: SessionDoc) {
    const exams = await this.courseService.getUnapprovedExams(
      session.context.id,
    );

    return {
      message: 'Unapproved exams fetched',
      data: { exams },
    };
  }

  @Get('exams/completed-exams')
  @Roles('USER')
  public async getCompletedExams(@Session() session: SessionDoc) {
    const exams = await this.courseService.getCompletedExams(
      session.context.id,
    );

    return {
      message: 'Completed exams fetched',
      data: { exams },
    };
  }

  @Get('exams/exams')
  @Roles('USER')
  public async getExams(@Session() session: SessionDoc) {
    const exams = await this.courseService.getUnapprovedExams(
      session.context.id,
    );

    return {
      message: 'Exams fetched',
      data: { exams },
    };
  }

  @Get('exams/instructor-exams')
  @Roles('INSTRUCTOR')
  public async getInstructorExams(@Session() session: SessionDoc) {
    const exams = await this.courseService.getInstructorExams(
      session.context.id,
    );

    return {
      message: 'Instructor exams fetched',
      data: { exams },
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

  @Get('get-exam-by-id/:examId')
  public async getExamById(
    @Param('examId') examId: string,
    @Session() session: SessionDoc,
  ) {
    const exam = await this.courseService.getExamById(examId);

    const completedExams: any = await this.courseService.getCompletedExams(
      session.context.id,
    );

    const isCompleted = completedExams.completedExams
      .map((ce: any) => ce.exam)
      .includes(examId);

    this.logger.log('Exam fetched', CourseController.name);

    return {
      message: 'Exam fetched',
      data: {
        exam: {
          questions: exam.questions,
          isCompleted,
        },
      },
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

    const isOwner = await this.courseService.isOwnerOfCourse(userId, courseId);

    if (!isOwner) {
      throw new UnauthorizedException(
        'You need to be owner of this course to edit its contents.',
      );
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

  @Put('update-course-section/:courseId/:courseContentId/sections/:sectionId')
  @Roles('INSTRUCTOR')
  public async updateCourseSection(
    @Param('courseContentId') courseContentId: string,
    @Param('sectionId') sectionId: string,
    @Body() updateCourseSectionDto: UpdateCourseSectionDto,
    @Param('courseId') courseId: string,
    @Session() session: SessionDoc,
  ) {
    const { id: userId } = session.context;

    const isOwner = await this.courseService.isOwnerOfCourse(userId, courseId);

    if (!isOwner) {
      throw new UnauthorizedException(
        'You need to be owner of this course to edit its contents.',
      );
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
    @Session() session: SessionDoc,
  ) {
    console.log(createSectionContentDto);
    const sectionContent = await this.courseService.createSectionContent({
      ...createSectionContentDto,
      owner: session.context.id,
    });

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

    const isOwner = await this.courseService.isOwnerOfCourse(userId, courseId);

    if (!isOwner) {
      throw new UnauthorizedException(
        'You need to be owner of this course to edit its contents.',
      );
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

  @Post('upload-thumbnail/:id/thumbnail')
  @Roles('INSTRUCTOR')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, { mimetype }, cb) => {
        if (mimetype.includes('image')) {
          return cb(null, true);
        }
        return cb(new BadRequestException('File type must be image'), false);
      },
      limits: { fileSize: 5_000_000 },
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

  @Post('upload-video/:sectionContentId')
  @Roles('INSTRUCTOR')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, { mimetype }, cb) => {
        if (mimetype.includes('video')) {
          return cb(null, true);
        }
        return cb(new BadRequestException('File type must be video'), false);
      },
      limits: { fileSize: 50_000_000 },
    }),
  )
  public async uploadVideo(
    @Param('sectionContentId') sectionContentId: string,
    @UploadedFile() file: Express.Multer.File,
    @Session() session: SessionDoc,
  ) {
    const isOwner = await this.courseService.isOwnerOfSectionContent(
      sectionContentId,
      session.context.id,
    );

    if (!isOwner) {
      throw new ForbiddenException('Not owner of the section content');
    }

    const course = await this.courseService.uploadSectionContent(
      sectionContentId,
      file.buffer,
    );

    this.logger.log(
      `Section content video uploaded [sectionContentId: ${sectionContentId}]`,
      CourseController.name,
    );

    return {
      message: 'Section content video uploaded',
      data: { course },
    };
  }

  @Post('add-reviews/:id/reviews')
  public async addReviewToCourse(
    @Param('id') id: string,
    @Session() session: SessionDoc,
    @Body() addReviewToCourseDto: AddReviewToCourseDto,
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

  @Post('purchase-course')
  @Roles('USER')
  public async purchaseCourse(
    @Session() session: SessionDoc,
    @Body() purchaseCourseDto: PurchaseCourseDto,
  ) {
    const { id: userId } = session.context;

    for await (const course of purchaseCourseDto.ids) {
      await this.courseService.purchaseCourse(userId, course);
    }

    this.logger.log(
      `Course purchased [courseIds: ${purchaseCourseDto.ids}] by user [userId: ${userId}]`,
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
