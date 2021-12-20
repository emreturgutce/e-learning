import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  COURSE_CONTENT_COLLECTION_NAME,
  SECTION_CONTENT_COLLECTION_NAME,
  USER_COLLECTION_NAME,
} from 'src/config/contants';
import { SectionContent } from './section-content.schema';

export type CourseContentDocument = CourseContent & Document;

@Schema({ collection: COURSE_CONTENT_COLLECTION_NAME })
export class CourseContent {
  @Prop({
    type: [
      {
        title: {
          type: String,
          unique: true,
        },
        section_contents: [
          {
            type: Types.ObjectId,
            ref: SECTION_CONTENT_COLLECTION_NAME,
          },
        ],
      },
    ],
  })
  sections: {
    id: string;
    title: string;
    section_contents: string[];
  }[];

  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
  })
  owner: string;
}

export const CourseContentSchema = SchemaFactory.createForClass(CourseContent);
