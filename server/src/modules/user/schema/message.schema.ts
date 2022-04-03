import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  USER_COLLECTION_NAME,
  MESSAGE_COLLECTION_NAME,
} from 'src/config/contants';
import { User } from './user.schema';

export type MessageDocument = Message & Document;

@Schema({
  collection: MESSAGE_COLLECTION_NAME,
})
export class Message {
  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  })
  sender: User;

  @Prop({
    type: Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  })
  receiver: User;

  @Prop({
    type: String,
    required: true,
  })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.pre('find', function (next) {
  this.populate('sender', 'email _id');
  this.populate('receiver', 'email _id');
  next();
});
