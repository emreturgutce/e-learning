import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  COURSE_CONTENT_COLLECTION_NAME,
  SECTION_CONTENT_COLLECTION_NAME,
} from 'src/config/contants';
import { SectionContent } from './section-content.schema';

export type CourseContentDocument = CourseContent & Document;

@Schema({ collection: COURSE_CONTENT_COLLECTION_NAME })
export class CourseContent {
  @Prop({
    type: [
      {
        title: String,
        section_contents: {
          type: Types.ObjectId,
          ref: SECTION_CONTENT_COLLECTION_NAME,
        },
      },
    ],
  })
  sections: {
    title: string;
    section_contents: SectionContent[];
  }[];
}

export const CourseContentSchema = SchemaFactory.createForClass(CourseContent);
