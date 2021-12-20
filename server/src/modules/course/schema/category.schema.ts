import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CATEGORY_COLLECTION_NAME } from 'src/config/contants';

export type CategoryDocument = Category & Document;

@Schema({
  collection: CATEGORY_COLLECTION_NAME,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    },
  },
})
export class Category {
  @Prop({
    type: String,
    unique: true,
    trim: true,
    max: [255, 'Maximum 255'],
    required: true,
  })
  name: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  is_deleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
