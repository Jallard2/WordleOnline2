import socketIO from 'socket.io-client';
const sockets = socketIO.connect('http://localhost:4000');
export {
    sockets
};