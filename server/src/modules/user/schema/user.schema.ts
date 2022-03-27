import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Document, HookNextFunction, Types } from 'mongoose';
import {
  ANSWERED_EXAM_COLLECTION_NAME,
  COURSE_COLLECTION_NAME,
  EXAM_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';
import { AnsweredExam } from 'src/modules/course/schema/answered-exam.schema';

export type UserDocument = User & Document;

export type UserRole = 'USER' | 'INSTRUCTOR' | 'ADMIN';
export enum UserType {
  USER,
  INSTRUCTOR,
  ADMIN,
}

@Schema({
  collection: USER_COLLECTION_NAME,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
})
export class User {
  @Prop({
    type: String,
    maxlength: [128, 'Maximum 128 characters'],
    trim: true,
  })
  firstname: string;

  @Prop({
    type: String,
    maxlength: [128, 'Maximum 128 characters'],
    trim: true,
  })
  lastname: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
  })
  profile_image: string;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: COURSE_COLLECTION_NAME,
      },
    ],
  })
  courses: string[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: COURSE_COLLECTION_NAME,
      },
    ],
  })
  wishlist: string[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: COURSE_COLLECTION_NAME,
      },
    ],
  })
  cart: string[];

  @Prop({
    type: String,
    enum: ['INSTRUCTOR', 'USER', 'ADMIN'],
    default: 'USER',
    required: true,
  })
  type: UserRole;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: ANSWERED_EXAM_COLLECTION_NAME,
      },
    ],
  })
  unapprovedExams: AnsweredExam[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: EXAM_COLLECTION_NAME,
      },
    ],
  })
  exams: string[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: ANSWERED_EXAM_COLLECTION_NAME,
      },
    ],
  })
  completedExams: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: HookNextFunction) {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.get('password'), 10);
    this.set('password', hashedPassword);
  }

  return next();
});
