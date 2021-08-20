import { Logger, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';
import { COURSE_COLLECTION_NAME } from 'src/config/contants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COURSE_COLLECTION_NAME, schema: CourseSchema },
    ]),
  ],
  providers: [CourseService, Logger],
  controllers: [CourseController],
})
export class CourseModule {}
