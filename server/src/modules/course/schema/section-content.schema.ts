import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  QUESTION_COLLECTION_NAME,
  SECTION_CONTENT_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';
import { Question } from './question.schema';

export type SectionContentDocument = SectionContent & Document;

export enum ContentType {
  VIDEO,
  TEXT,
  QUIZ,
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
    type: [
      {
        question: {
          type: Types.ObjectId,
          ref: QUESTION_COLLECTION_NAME,
        },
      },
    ],
  })
  questions: Question[];

  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  })
  owner: string;
}

export const SectionContentSchema =
  SchemaFactory.createForClass(SectionContent);
