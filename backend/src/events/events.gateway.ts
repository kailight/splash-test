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
import rand from './rand'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // findAll(...args): Observable<WsResponse<number>> {

  @SubscribeMessage('events')
  findAll(...args): any {
    const socket = args[0]
    console.info('events message received', typeof args, Array.isArray(args))


    let stack = 0
    const max = rand(200,900)

    const rng = () => {
      const rand = Math.floor(1 + stack * 0.1);
      console.info(rand, max);
      stack = stack+rand
      return stack
    }

    let interval
    interval = setInterval( () => {
      socket.emit( "data", rng() )
      if (stack >= max) {
        clearInterval(interval)
      }
    }, 50)

    /*
    return from([0]).pipe(
      map(item => ({ event: 'data', data: item }))
    );
    */

  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}