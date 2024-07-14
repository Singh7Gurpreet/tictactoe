const map = new Map();
const set = new Set();

function joinRoom(socket) {
  const roomId = socket.request.session.room;
  if (roomId === undefined) {
    throw Error('Room not defined properly');
  }
  console.log(set.has(roomId));
  socket.join(roomId);
  if (set.has(roomId)) {
    console.log('Sent x');
    socket.emit('symbol', 'X');
  } else {
    console.log('send o');
    set.add(roomId);
    socket.emit('symbol', 'O');
  }
  console.log(`${socket.id} joined ${roomId}`);
}

module.exports = { joinRoom };
