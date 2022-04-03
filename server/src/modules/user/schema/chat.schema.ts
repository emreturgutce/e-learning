import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  CHAT_COLLECTION_NAME,
  USER_COLLECTION_NAME,
  MESSAGE_COLLECTION_NAME,
} from 'src/config/contants';
import { Message } from './message.schema';
import { User } from './user.schema';

export type ChatDocument = Chat & Document;

@Schema({
  collection: CHAT_COLLECTION_NAME,
})
export class Chat {
  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: USER_COLLECTION_NAME,
      },
    ],
  })
  participants: User[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: MESSAGE_COLLECTION_NAME,
      },
    ],
  })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
