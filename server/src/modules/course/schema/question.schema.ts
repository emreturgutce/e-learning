import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  QUESTION_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';

export enum QuestionType {
  OPEN_ENDED = 'OPEN_ENDED',
  MULTIPLE_CHOICES_SINGLE_ANSWER = 'MULTIPLE_CHOICES_SINGLE_ANSWER',
}

export type QuestionDocument = Question & Document;

@Schema({ collection: QUESTION_COLLECTION_NAME })
export class Question {
  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: [255, 'Maximum 255 characters.'],
  })
  text: string;

  @Prop({
    type: String,
    required: true,
    enum: ['OPEN_ENDED', 'MULTIPLE_CHOICES_SINGLE_ANSWER'],
    default: 'MULTIPLE_CHOICES_SINGLE_ANSWER',
  })
  type: QuestionType;

  @Prop({
    type: [String],
  })
  options: string[];

  @Prop({
    type: String,
    required: true,
  })
  answer: string;

  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  })
  owner: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    max: 100,
  })
  point: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
