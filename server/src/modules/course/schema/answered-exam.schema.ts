import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  ANSWERED_EXAM_COLLECTION_NAME, EXAM_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';

export type AnsweredExamDocument = AnsweredExam & Document;

@Schema({ collection: ANSWERED_EXAM_COLLECTION_NAME })
export class AnsweredExam {
  @Prop({
    type: Types.ObjectId,
    ref: EXAM_COLLECTION_NAME,
  })
  exam: string;

  @Prop({
    type: [String],
    required: true,
  })
  answer: string[];

  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  })
  student: string;

  @Prop({
    type: Number,
  })
  totalPoints: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  approved: boolean;
}

export const AnsweredExamSchema = SchemaFactory.createForClass(AnsweredExam);
