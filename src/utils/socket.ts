import io from 'socket.io-client';

var socket = io('https://swaptube.net', {
  transports: ['websocket', 'polling', 'flashsocket'],
});
export default socket;
