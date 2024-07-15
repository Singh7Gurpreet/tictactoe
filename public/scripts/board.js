const buttons = document.querySelectorAll('.elementButton');
let state = 0;
let opponentName, yourName;

async function getName() {
  try {
    const response = await axios.get('http://localhost:3000/name');
    opponentName = response.opponentName;
    yourName = response.name;
  } catch (error) {
    console.error(error);
    window.alert('something went wrong');
  }
}

let mark, ownMark;

function flipState() {
  state !== state;
  const turn = state === 0 ? `${opponentName}'s turn` : `${yourName}'s turn`;
  document.querySelector('.code p').innerText = turn;
}

// s is player's state fetching info from server
socket.on('symbol', (symbol) => {
  mark = symbol;
  if (mark === 'X') ownMark = 'O';
  else ownMark = 'X';
});

socket.on('state', (stateVar) => {
  state = stateVar;
  if (state === 1) addEvents();
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
  flipState();
  addEvents();
});

async function playerAction(event) {
  const tileSelected = event.target.dataset.value;
  const button = event.target;
  button.innerText = mark;
  socket.emit('markTile', tileSelected);
  flipState();
  removeEvents();
}

function removeEvents() {
  buttons.forEach((button) => {
    button.removeEventListener('click', playerAction);
  });
}

function addEvents() {
  buttons.forEach((button) => {
    button.addEventListener('click', playerAction);
  });
}
