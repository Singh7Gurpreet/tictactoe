const buttons = document.querySelectorAll('.elementButton');
let state = false;
let opponentName, yourName;

function getText(button) {
  return button.innerText;
}

function checkWinner() {
  if (
    getText(buttons[0]) !== '' &&
    getText(buttons[0]) === getText(buttons[1]) &&
    getText(buttons[2]) === getText(buttons[1])
  ) {
    console.log('Won');
  }
}

async function getName() {
  try {
    const response = await axios.get('http://localhost:3000/name');
    opponentName = response.data.opponentName;
    yourName = response.data.name;
  } catch (error) {
    console.error(error);
    window.alert('something went wrong');
  }
}

let mark, ownMark;

function flipText() {
  const turn =
    state === false ? `${opponentName}'s turn` : `${yourName}'s turn`;
  document.querySelector('.turns p').innerText = turn;
}

function flipState() {
  state = !state;
  flipText();
}

// s is player's state fetching info from server
socket.on('symbol', (symbol) => {
  mark = symbol;
  if (mark === 'X') ownMark = 'O';
  else ownMark = 'X';
  checkWinner();
});

socket.on('state', (stateVar) => {
  state = stateVar === 1 ? true : false;
  if (state === true) addEvents();
  console.log('state');
});

socket.on('roomNumber', (roomNumber) => {
  document.querySelector('.code p').innerText = roomNumber;
});

socket.on('joinedRoom', async () => {
  await getName();
  const loading = document.querySelector('.loading');
  loading.style.display = 'none';
  document.querySelector('.main').style.display = 'flex'; // Corrected to 'block'
  flipText();
});

socket.on('markedStatus', (markedTile) => {
  buttons[markedTile - 1].innerText = ownMark;
  buttons[markedTile - 1].disabled = true;
  checkWinner();
  flipState();
  addEvents();
});

async function playerAction(event) {
  const tileSelected = event.target.dataset.value;
  const button = event.target;
  button.innerText = mark;
  socket.emit('markTile', tileSelected);
  console.log('State Before', state);
  flipState();
  console.log('State after', state);
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
