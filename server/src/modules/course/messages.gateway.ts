import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  findAll(@MessageBody() data: any) {
    console.log(data);
    return data;
  }
}
