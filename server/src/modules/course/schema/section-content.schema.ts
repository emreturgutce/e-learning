import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SECTION_CONTENT_COLLECTION_NAME } from 'src/config/contants';

export type SectionContentDocument = SectionContent & Document;

enum ContentType {
  VIDEO,
  TEXT,
}

@Schema({ collection: SECTION_CONTENT_COLLECTION_NAME })
export class SectionContent {
  @Prop({
    type: String,
    required: true,
    maxLength: [128, 'Maximum 255 characters'],
  })
  title: string;

  @Prop({
    type: String,
    enum: ['VIDEO', 'TEXT'],
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
}

export const SectionContentSchema =
  SchemaFactory.createForClass(SectionContent);
