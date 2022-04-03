import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from './user.service';

class JoinRoomMessage {
  room: string;
  receiver: string;
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
}

class SendMessage {
  room: string;
  message: string;
  sender: string;
  receiver: string;
}

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('join')
  async join(
    @MessageBody() data: JoinRoomMessage,
    @ConnectedSocket() socket: Socket,
  ) {
    if (!data.room) {
      const chat = await this.userService.createChat([
        data.receiver,
        data.userId,
      ]);
      socket.join(chat.id);
    } else {
      socket.join(data.room);
    }
  }

  @SubscribeMessage('send_message')
  async findAll(
    @MessageBody() data: SendMessage,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.userService.sendMessage({
      sender: data.sender,
      receiver: data.receiver,
      message: data.message,
      chatId: data.room,
    });
    this.server.to(data.room).emit('message', { message: data.message });
    return data;
  }
}
