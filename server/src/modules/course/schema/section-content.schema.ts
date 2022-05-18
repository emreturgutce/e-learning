import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  EXAM_COLLECTION_NAME,
  QUESTION_COLLECTION_NAME,
  SECTION_CONTENT_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';
import { Exam } from './exam.schema';
import { Question } from './question.schema';

export type SectionContentDocument = SectionContent & Document;

export enum ContentType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUIZ = 'QUIZ',
}

@Schema({ collection: SECTION_CONTENT_COLLECTION_NAME })
export class SectionContent {
  @Prop({
    type: String,
    required: true,
    unique: true,
    maxLength: [128, 'Maximum 255 characters'],
  })
  title: string;

  @Prop({
    type: String,
    enum: ['VIDEO', 'TEXT', 'QUIZ'],
    default: 'VIDEO',
  })
  type: ContentType;

  @Prop({
    type: String,
  })
  video_url: string;

  @Prop({
    type: String,
  })
  text: string;

  @Prop({
    type: Number,
  })
  duration: number;

  @Prop({
    type: Types.ObjectId,
    ref: EXAM_COLLECTION_NAME,
  })
  exam: Exam;

  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  })
  owner: string;
}

export const SectionContentSchema =
  SchemaFactory.createForClass(SectionContent);
