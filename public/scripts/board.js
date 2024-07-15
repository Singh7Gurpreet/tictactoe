const buttons = document.querySelectorAll('.elementButton');
let opponentName, yourName;

async function getName() {
  try {
    const response = await axios.get('http://localhost:3000/name');
    console.log(response.data);
  } catch (error) {
    console.error(error);
    window.alert('something went wrong');
  }
}
let mark, ownMark;
socket.on('symbol', (symbol) => {
  mark = symbol;
  if (mark === 'X') ownMark = 'O';
  else ownMark = 'X';
});

socket.on('roomNumber', (roomNumber) => {
  document.querySelector('.code p').innerText = roomNumber;
});

socket.on('joinedRoom', () => {
  getName();
  const loading = document.querySelector('.loading');
  loading.style.display = 'none';
  document.querySelector('.main').style.display = 'grid'; // Corrected to 'block'
});

socket.on('markedStatus', (markedTile) => {
  buttons[markedTile - 1].innerText = ownMark;
  buttons[markedTile - 1].disabled = true;
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
