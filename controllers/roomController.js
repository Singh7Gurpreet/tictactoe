const map = new Map();
const set = new Set();

function joinRoom(socket) {
  const roomId = socket.request.session.room;
  if (roomId === undefined) {
    throw Error('Room not defined properly');
  }
  socket.join(roomId);

  console.log(`${socket.id} joined ${roomId}`);
}

module.exports = { joinRoom };
