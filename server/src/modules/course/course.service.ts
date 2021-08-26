import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { S3Service } from 'src/providers/s3/s3.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schema/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly CourseModel: Model<CourseDocument>,
    private readonly s3Service: S3Service,
  ) {}

  public createCourse(
    createCourseDto: CreateCourseDto,
  ): Promise<CourseDocument> {
    return this.CourseModel.create(createCourseDto);
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

  public getCourses() {
    return this.CourseModel.find().exec();
  }

  public findCourseById(id: string) {
    return this.CourseModel.findById(id).exec();
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
}
