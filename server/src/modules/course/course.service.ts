import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CourseContentDocument } from './schema/course-content.schema';
import { UserService } from 'src/modules/user/user.service';
import { S3Service } from 'src/providers/s3/s3.service';
import { AddReviewToCourseDto } from './dto/add-review-to-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schema/course.schema';
import { Review, ReviewDocument } from './schema/review.schema';
import {
  ANSWERED_EXAM_COLLECTION_NAME,
  CATEGORY_COLLECTION_NAME,
  COURSE_CONTENT_COLLECTION_NAME,
  EXAM_COLLECTION_NAME,
  QUESTION_COLLECTION_NAME,
  SECTION_CONTENT_COLLECTION_NAME,
} from 'src/config/contants';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { AddCourseSectionDto } from './dto/add-course-section.dto';
import { SectionContentDocument } from './schema/section-content.schema';
import { CreateSectionContentDto } from './dto/create-section-content.dto';
import { UpdateCourseSectionDto } from './dto/update-course-section.dto';
import { UpdateSectionContentDto } from './dto/update-section-content.dto';
import { CategoryDocument } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExamDocument } from './schema/exam.schema';
import { AnsweredExamDocument } from './schema/answered-exam.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionDocument } from './schema/question.schema';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(COURSE_CONTENT_COLLECTION_NAME)
    private readonly CourseContentModel: Model<CourseContentDocument>,
    @InjectModel(Review.name)
    private readonly ReviewModel: Model<ReviewDocument>,
    @InjectModel(Course.name)
    private readonly CourseModel: Model<CourseDocument>,
    @InjectModel(SECTION_CONTENT_COLLECTION_NAME)
    private readonly SectionContentModel: Model<SectionContentDocument>,
    @InjectModel(CATEGORY_COLLECTION_NAME)
    private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel(EXAM_COLLECTION_NAME)
    private readonly ExamModel: Model<ExamDocument>,
    @InjectModel(ANSWERED_EXAM_COLLECTION_NAME)
    private readonly AnsweredExamModel: Model<AnsweredExamDocument>,
    @InjectModel(QUESTION_COLLECTION_NAME)
    private readonly QuestionModel: Model<QuestionDocument>,
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
  ) {}

  public async createCourse(
    createCourseDto: CreateCourseDto,
  ): Promise<CourseDocument> {
    const courseContent = await this.createCourseContent({ sections: [] });

    return this.CourseModel.create({
      ...createCourseDto,
      content: courseContent._id,
    });
  }

  public updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.CourseModel.findByIdAndUpdate(id, updateCourseDto, {
      new: true,
    }).exec();
  }

  public addCourseSection(
    courseContentId: string,
    addCourseSectionDto: AddCourseSectionDto,
  ) {
    return this.CourseContentModel.findByIdAndUpdate(
      courseContentId,
      { $push: { sections: addCourseSectionDto } },
      {
        new: true,
        useFindAndModify: true,
      },
    );
  }

  public async updateCourseSection(
    courseContentId: string,
    sectionId: string,
    updateCourseSectionDto: UpdateCourseSectionDto,
  ) {
    const courseContent = await this.CourseContentModel.findById(
      courseContentId,
    ).exec();

    if (!courseContent) {
      throw new NotFoundException(
        `Course content with ${courseContentId} id not found`,
      );
    }

    const sectionIdx = courseContent.sections.findIndex(
      (section) => section.id === sectionId,
    );

    if (sectionIdx === -1) {
      throw new NotFoundException(`Section with ${sectionId} id not found`);
    }

    if (updateCourseSectionDto.title) {
      courseContent.sections[sectionIdx].title = updateCourseSectionDto.title;
    }

    if (updateCourseSectionDto.section_contents) {
      courseContent.sections[sectionIdx].section_contents =
        updateCourseSectionDto.section_contents;
    }

    return courseContent.save();
  }

  public createSectionContent(
    createSectionContentDto: CreateSectionContentDto,
  ) {
    return this.SectionContentModel.create(createSectionContentDto);
  }

  public updateSectionContent(
    sectionContentId: string,
    updateSectionContentDto: UpdateSectionContentDto,
  ) {
    return this.SectionContentModel.findByIdAndUpdate(
      sectionContentId,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateSectionContentDto,
      {
        new: true,
        useFindAndModify: true,
      },
    );
  }

  public incrementTotalStudent(id: string, inc = 1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.CourseModel.findByIdAndUpdate(
      id,
      { $inc: { total_students: inc } },
      {
        new: true,
      },
    ).exec();
  }

  public decrementTotalStudent(id: string, dec = 1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.CourseModel.findByIdAndUpdate(
      id,
      { $inc: { total_students: dec * -1 } },
      {
        new: true,
      },
    ).exec();
  }

  public async didBuyTheCourse(
    userId: string,
    courseId: string,
  ): Promise<boolean> {
    const user = await this.userService.findUserById(userId);

    return user.courses.some((course) => course === courseId);
  }

  private createCourseContent(createCourseContentDto: CreateCourseContentDto) {
    return this.CourseContentModel.create(createCourseContentDto);
  }

  private createReview(
    addReviewToCourseDto: AddReviewToCourseDto,
  ): Promise<ReviewDocument> {
    return this.ReviewModel.create(addReviewToCourseDto);
  }

  public async addReviewToCourse(
    id: string,
    addReviewToCourseDto: AddReviewToCourseDto,
  ) {
    const review = await this.createReview(addReviewToCourseDto);

    return this.CourseModel.findByIdAndUpdate(
      id,
      { $push: { reviews: review._id } },
      {
        new: true,
        useFindAndModify: true,
      },
    ).exec();
  }

  public getCourses() {
    return this.CourseModel.find().exec();
  }

  public findCourseById(id: string) {
    return this.CourseModel.findById(id)
      .populate({
        path: 'content',
        populate: {
          path: 'sections',
          populate: {
            path: 'section_contents',
          },
        },
      })
      .exec();
  }

  public async uploadCourseThumbnail(courseId: string, file: Buffer) {
    const path = `courses/${courseId}/thumbnails/${nanoid(10)}.webp`;
    const imageUrl = this.s3Service.generateFileUrl(path);

    await this.s3Service.uploadFileToS3(path, file);

    return this.CourseModel.findByIdAndUpdate(
      courseId,
      { thumbnail: imageUrl },
      { new: true },
    ).exec();
  }

  public async isOwnerOfCourse(id: string, courseId: string): Promise<boolean> {
    const course = await this.findCourseById(courseId);

    if (!course) {
      return false;
    }

    return course.instructor === id;
  }

  public async listCategories(): Promise<CategoryDocument[]> {
    return this.CategoryModel.find().exec();
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.CategoryModel.create(createCategoryDto);
  }

  public async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.CategoryModel.findByIdAndUpdate(categoryId, updateCategoryDto, {
      new: true,
    }).exec();
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    await this.CategoryModel.findByIdAndUpdate(categoryId, {
      is_deleted: true,
    }).exec();
  }

  public async purchaseCourse(userId: string, courseId: string): Promise<void> {
    const isCourseExist = await this.CourseModel.exists({ _id: courseId });

    if (!isCourseExist) {
      throw new NotFoundException(`Course with ${courseId} id not found`);
    }

    const isPurchasedCourse = await this.userService.isPurchasedCourse(
      userId,
      courseId,
    );

    if (isPurchasedCourse) {
      throw new BadRequestException(
        `Course [courseId: ${courseId}] already purchased for user [userId: ${userId}]`,
      );
    }

    await this.userService.registerCourse(userId, courseId);

    await this.incrementTotalStudent(courseId);
  }

  public async refundCourse(userId: string, courseId: string): Promise<void> {
    const isPurchasedCourse = await this.userService.isPurchasedCourse(
      userId,
      courseId,
    );

    if (!isPurchasedCourse) {
      throw new BadRequestException(
        `Course [courseId: ${courseId}] is not purchased by user [userId: ${userId}]`,
      );
    }

    await this.userService.refundCourse(userId, courseId);

    await this.incrementTotalStudent(courseId);
  }

  public async listPurchasedCourses(userId: string) {
    return this.userService.listPurchasedCourses(userId);
  }

  public async listInstructorsCourses(instructorId: string) {
    return this.CourseModel.find({ instructor: instructorId }).exec();
  }

  public async listCourseContents(instructorId: string) {
    return this.CourseContentModel.find({ owner: instructorId }).exec();
  }

  public async createQuestion(createQuestionDto: CreateQuestionDto) {
    return this.QuestionModel.create(createQuestionDto);
  }

  public async listQuestions(owner: string) {
    return this.QuestionModel.find({ owner }).exec();
  }

  public async deleteQuestion(questionId: string) {
    return this.QuestionModel.findByIdAndDelete(questionId).exec();
  }

  public async updateQuestion(
    questionId: string,
    updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.QuestionModel.findByIdAndUpdate(
      questionId,
      updateQuestionDto,
    ).exec();
  }

  public async createExam(createExamDto: CreateExamDto) {
    const questions = await this.QuestionModel.find({
      _id: { $in: createExamDto.questions },
    }).exec();

    const totalPoints = questions.reduce((prev, curr) => {
      return prev + curr.point;
    }, 0);

    if (totalPoints !== 100) {
      throw new BadRequestException('Total points must be equal to 100.');
    }

    return this.ExamModel.create(createExamDto);
  }

  public async getUnapprovedExams(instructorId: string) {
    return this.userService.getUnapprovedExams(instructorId);
  }

  public async getCompletedExams(studentId: string) {
    return this.userService.getCompletedExams(studentId);
  }

  public async getExams(studentId: string) {
    return this.userService.getExams(studentId);
  }

  public async getInstructorExams(instructorId: string) {
    return this.ExamModel.find({ owner: instructorId }).exec();
  }

  public async updateExam(examId: string, updateExamDto: UpdateExamDto) {
    return this.ExamModel.findByIdAndUpdate(examId, updateExamDto).exec();
  }

  public async completeExam(
    examId: string,
    studentId: string,
    answers: string[],
  ) {
    const exam = await this.ExamModel.findById(examId).exec();
    const answeredExam = await this.AnsweredExamModel.create({
      exam: examId,
      answer: answers,
      student: studentId,
      approved: false,
    });

    await this.userService.addToUnapprovedExams(exam.owner, answeredExam.id);
    await this.userService.addToCompletedExams(studentId, answeredExam.id);
  }

  public async approveExam(
    examId: string,
    instructorId: string,
    point: number,
  ) {
    await this.userService.approveExam(examId, instructorId);
    await this.AnsweredExamModel.findByIdAndUpdate(examId, {
      totalPoints: point,
      approved: true,
    }).exec();
  }
}
