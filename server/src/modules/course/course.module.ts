import { Logger, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';
import {
  COURSE_COLLECTION_NAME,
  REVIEW_COLLECTION_NAME,
} from 'src/config/contants';
import { S3Module } from 'src/providers/s3/s3.module';
import { UserModule } from '../user/user.module';
import { ReviewSchema } from './schema/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COURSE_COLLECTION_NAME, schema: CourseSchema },
      { name: REVIEW_COLLECTION_NAME, schema: ReviewSchema },
    ]),
    UserModule,
    S3Module,
  ],
  providers: [CourseService, Logger],
  controllers: [CourseController],
})
export class CourseModule {}
