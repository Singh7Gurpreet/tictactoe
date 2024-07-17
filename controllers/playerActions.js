function tileMarked(socket, markedTile) {
  console.log(socket.request.session.room);
  socket.to(socket.request.session.room).emit('markedStatus', markedTile);
  console.log(`${socket.id} marked `, markedTile);
}

function winner(socket, player) {
  socket.emit('winner', player);
}

function tied(socket) {
  socket.emit('tied');
}

module.exports = { tileMarked, winner, tied };
