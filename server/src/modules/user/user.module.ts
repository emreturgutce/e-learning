import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import {
  USER_COLLECTION_NAME,
  CHAT_COLLECTION_NAME,
  MESSAGE_COLLECTION_NAME,
} from 'src/config/contants';
import { MessagesGateway } from './messages.gateway';
import { ChatSchema } from './schema/chat.schema';
import { MessageSchema } from './schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_COLLECTION_NAME, schema: UserSchema },
      { name: CHAT_COLLECTION_NAME, schema: ChatSchema },
      { name: MESSAGE_COLLECTION_NAME, schema: MessageSchema },
    ]),
  ],
  providers: [UserService, Logger, MessagesGateway],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
