function tileMarked(socket, markedTile) {
  console.log('Someone marked ', markedTile);
}

function winner(socket, player) {
  console.log('this player is winner');
}

function tied(socket) {
  console.log('This game is tied');
}

module.exports = { tileMarked, winner, tied };
