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
    map.set(roomId, []);
  }
  map.get(roomId).push([socket.request.session.name]);
  socket.emit('roomNumber', roomId);
  console.log(`${socket.id} joined ${roomId}`);
}

function getNames(roomId) {
  return map.get(roomId);
}

module.exports = { joinRoom, getNames };
