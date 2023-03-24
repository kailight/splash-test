import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { from, Observable, takeWhile } from "rxjs";
import { map, reduce } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(...args): Observable<WsResponse<number>> {
    const socket = args[0]
    console.info('events message received', typeof args, Array.isArray(args))


    let stack = 0
    const rng = () => {
      const rand = Math.floor((Math.random() * 1) + 1);
      stack = stack+rand
      return stack
    }

    let interval
    interval = setInterval( () => {
      socket.emit( "data", rng() )
      if (stack >= 100) {
        clearInterval(interval)
      }
    }, 50)

    return from([0]).pipe(
      map(item => ({ event: 'data', data: item }))
    );

  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}