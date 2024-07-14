const buttons = document.querySelectorAll('.elementButton');

socket.on('markedStatus', (markedTile) => {
  console.log('Player Marked ', markedTile);
});

async function playerAction(tileSelected) {
  socket.emit('markTile', tileSelected);
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    playerAction(event.target.dataset.value);
  });
});

//will receive socket from server to apply changes
//made by opponent on board
