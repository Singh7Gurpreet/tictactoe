function tileMarked(socket, markedTile) {
  console.log(socket.request.session.room);
  socket.to(socket.request.session.room).emit('markedStatus', markedTile);
  console.log(`${socket.id} marked `, markedTile);
}

function winner(socket, player) {
  console.log('this player is winner');
}

function tied(socket) {
  console.log('This game is tied');
}

module.exports = { tileMarked, winner, tied };
