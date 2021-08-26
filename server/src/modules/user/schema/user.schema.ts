import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Document, HookNextFunction, Types } from 'mongoose';
import {
  COURSE_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';
import { Course } from 'src/modules/course/schema/course.schema';

export type UserDocument = User & Document;

export type UserRole = 'USER' | 'INSTRUCTOR';
export enum UserType {
  USER,
  INSTRUCTOR,
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
  courses: Course[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: COURSE_COLLECTION_NAME,
      },
    ],
  })
  wishlist: Course[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: COURSE_COLLECTION_NAME,
      },
    ],
  })
  cart: Course[];

  @Prop({
    type: String,
    enum: ['INSTRUCTOR', 'USER'],
    default: 'USER',
    required: true,
  })
  type: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: HookNextFunction) {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.get('password'), 10);
    this.set('password', hashedPassword);
  }

  return next();
});
