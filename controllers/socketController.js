const { joinRoom } = require('./roomController');
const { tileMarked, winner, tied } = require('./playerActions');

const JOIN_ROOM = 'joinRoom';
const MARK_TILE = 'markTile';
const WINNER = 'winner';
const TIED = 'tied';

// Will contain logic for joining already created game
// and creatting game
function socketFunction(socket) {
  socket.on('disconnect', () => {
    // console.log(socket.request.session[room]);
    // will delete room from database the room
    // delete socket.request.session[room];
    //   socket.request.session.save((err) => {
    //     if (err) {
    //       console.error('Error saving session: ', err);
    //     }
    //   });
    //   console.log(`${socket.id} disconnected`);
  });

  socket.on(JOIN_ROOM, () => {
    joinRoom(socket);
  });

  // Records player markers on board tiles
  // It will also emit those changes made
  // to other user too
  socket.on(MARK_TILE, (markedTile) => {
    tileMarked(socket, markedTile);
  });

  // Will notifiy winning condition
  socket.on(WINNER, (player) => {
    winner(socket, player);
  });

  //Notifies the tie condition
  socket.on(TIED, () => {
    tied(socket.player);
  });
}

module.exports = socketFunction;
