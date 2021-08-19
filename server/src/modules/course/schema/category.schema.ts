import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CATEGORY_COLLECTION_NAME } from 'src/config/contants';

export type CategoryDocument = Category & Document;

@Schema({ collection: CATEGORY_COLLECTION_NAME })
export class Category {
  @Prop({
    type: String,
    unique: true,
    trim: true,
    max: [255, 'Maximum 255'],
    required: true,
  })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
