import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  EXAM_COLLECTION_NAME,
  QUESTION_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';

export type ExamDocument = Exam & Document;

@Schema({ collection: EXAM_COLLECTION_NAME })
export class Exam {
  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: QUESTION_COLLECTION_NAME,
      },
    ],
  })
  questions: string[];

  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  })
  owner: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
