import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3010';
const URL = 'http://localhost:3010';

export const socket = io(URL as any,{
  autoConnect: false
});

