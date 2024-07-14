const buttons = document.querySelectorAll('.elementButton');

let mark, ownMark;
socket.on('symbol', (symbol) => {
  mark = symbol;
  if (mark === 'X') ownMark = 'O';
  else ownMark = 'X';
});

socket.on('joinedRoom', () => {
  console.log('Other player joined');
  const loading = document.querySelector('.loading');
  loading.style.display = 'none';
  document.querySelector('.main').style.display = 'grid'; // Corrected to 'block'
});

socket.on('markedStatus', (markedTile) => {
  buttons[markedTile - 1].innerText = ownMark;
  buttons[markedTile - 1].disabled = true;
  console.log('Player Marked ', markedTile);
});

async function playerAction(tileSelected, button) {
  button.innerText = mark;
  socket.emit('markTile', tileSelected);
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    button.disabled = true;
    playerAction(event.target.dataset.value, button);
  });
});

//will receive socket from server to apply changes
//made by opponent on board
