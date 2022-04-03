import { Logger, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';
import {
  ANSWERED_EXAM_COLLECTION_NAME,
  CATEGORY_COLLECTION_NAME,
  COURSE_COLLECTION_NAME,
  COURSE_CONTENT_COLLECTION_NAME,
  EXAM_COLLECTION_NAME,
  QUESTION_COLLECTION_NAME,
  REVIEW_COLLECTION_NAME,
  SECTION_CONTENT_COLLECTION_NAME,
} from 'src/config/contants';
import { S3Module } from 'src/providers/s3/s3.module';
import { UserModule } from '../user/user.module';
import { ReviewSchema } from './schema/review.schema';
import { CourseContentSchema } from './schema/course-content.schema';
import { SectionContentSchema } from './schema/section-content.schema';
import { CategorySchema } from './schema/category.schema';
import { ExamSchema } from './schema/exam.schema';
import { AnsweredExamSchema } from './schema/answered-exam.schema';
import { QuestionSchema } from './schema/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COURSE_CONTENT_COLLECTION_NAME, schema: CourseContentSchema },
      { name: COURSE_COLLECTION_NAME, schema: CourseSchema },
      { name: REVIEW_COLLECTION_NAME, schema: ReviewSchema },
      { name: SECTION_CONTENT_COLLECTION_NAME, schema: SectionContentSchema },
      { name: CATEGORY_COLLECTION_NAME, schema: CategorySchema },
      { name: EXAM_COLLECTION_NAME, schema: ExamSchema },
      { name: ANSWERED_EXAM_COLLECTION_NAME, schema: AnsweredExamSchema },
      { name: QUESTION_COLLECTION_NAME, schema: QuestionSchema },
    ]),
    UserModule,
    S3Module,
  ],
  providers: [CourseService, Logger],
  controllers: [CourseController],
})
export class CourseModule {}
