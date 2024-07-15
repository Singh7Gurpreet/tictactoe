const map = new Map();
const set = new Set();

function joinRoom(socket) {
  const roomId = socket.request.session.room;
  if (roomId === undefined) {
    throw Error('Room not defined properly');
  }

  socket.join(roomId);
  if (set.has(roomId)) {
    socket.to(roomId).emit('joinedRoom');
    socket.emit('joinedRoom');
    socket.emit('symbol', 'X');
  } else {
    set.add(roomId);
    socket.emit('symbol', 'O');
  }
  socket.emit('roomNumber', roomId);
  console.log(`${socket.id} joined ${roomId}`);
}

module.exports = { joinRoom };
