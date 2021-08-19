import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  REVIEW_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';
import { User } from 'src/modules/user/schema/user.schema';

export type ReviewDocument = Review & Document;

@Schema({ collection: REVIEW_COLLECTION_NAME })
export class Review {
  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  })
  user: User;

  @Prop({
    type: String,
    trim: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
    min: [0, 'Minimum 0'],
    max: [5, 'Maximum 5'],
  })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
