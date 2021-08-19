import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  CATEGORY_COLLECTION_NAME,
  COURSE_COLLECTION_NAME,
  COURSE_CONTENT_COLLECTION_NAME,
  REVIEW_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';
import { User } from 'src/modules/user/schema/user.schema';
import { Category } from './category.schema';
import { Review } from './review.schema';

export type CourseDocument = Course & Document;

@Schema({ collection: COURSE_COLLECTION_NAME })
export class Course {
  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: [255, 'Maximum 255 characters.'],
  })
  title: string;

  @Prop({
    type: String,
    trim: true,
  })
  description: number;

  @Prop({
    type: Number,
    min: [0, 'Minimum 0'],
    required: true,
    default: 0,
  })
  price: number;

  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    // required: true,
  })
  instructor: User;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: CATEGORY_COLLECTION_NAME,
      },
    ],
  })
  categories: Category[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: REVIEW_COLLECTION_NAME,
      },
    ],
  })
  reviews: Review[];

  @Prop({
    type: Number,
    min: [0, 'Minimum 0'],
    required: true,
    default: 0,
  })
  total_students: number;

  @Prop({
    type: String,
  })
  preview: string;

  @Prop({
    type: Types.ObjectId,
    ref: COURSE_CONTENT_COLLECTION_NAME,
  })
  content: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  approved: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
