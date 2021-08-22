import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schema/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly CourseModel: Model<CourseDocument>,
  ) {}

  public createCourse() {
    const course = new this.CourseModel({
      title: 'Course 1',
      description: 'Description',
      price: 100,
      total_students: 10,
      approved: true,
    });

    return course.save();
  }

  public getCourses() {
    return this.CourseModel.find().exec();
  }
}
