const buttons = document.querySelectorAll('.elementButton');

let mark, ownMark;
socket.on('symbol', (symbol) => {
  mark = symbol;
  if (mark === 'X') ownMark = 'O';
  else ownMark = 'X';
});

socket.on('markedStatus', (markedTile) => {
  buttons[markedTile - 1].innerText = ownMark;
  console.log('Player Marked ', markedTile);
});

async function playerAction(tileSelected, button) {
  button.innerText = mark;
  socket.emit('markTile', tileSelected);
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    playerAction(event.target.dataset.value, button);
  });
});

//will receive socket from server to apply changes
//made by opponent on board
