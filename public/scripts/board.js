const buttons = document.querySelectorAll('.elementButton');
const resetButton = document.querySelector('.reset');
let state = false;
let opponentName, yourName;
let winnerSymbol = '';
let marked = 0;

function staleState() {}

resetButton.addEventListener('click', (event) => {
  //do something here
});

function getWinnerName(winnerSymbol) {
  console.log(winnerSymbol, yourName, opponentName);
  let name = '';
  if (winnerSymbol == mark) name = yourName;
  else name = opponentName;
  return name;
}

function getText(button) {
  return button.innerText;
}

function checkForRows() {
  // check for rows
  for (let i = 0; i < 9; i += 3) {
    if (getText(buttons[i]) != '') {
      // for row conditions
      if (
        getText(buttons[i]) === getText(buttons[i + 1]) &&
        getText(buttons[i + 1]) === getText(buttons[i + 2])
      ) {
        // emit winner event
        winnerSymbol = getText(buttons[i]);
        console.log('rows');
        return true;
      }
    }
  }
  return false;
}

function checkForColumn() {
  // check for columns
  for (let i = 0; i < 3; i++) {
    if (getText(buttons[i]) !== '') {
      if (
        getText(buttons[i]) === getText(buttons[i + 3]) &&
        getText(buttons[i + 3]) === getText(buttons[i + 6])
      ) {
        // emit winner event
        winnerSymbol = getText(buttons[i]);
        console.log('column');
        return true;
      }
    }
  }
  return false;
}

function checkForDiagonal() {
  if (getText(buttons[4]) !== '') {
    if (
      getText(buttons[0]) === getText(buttons[4]) &&
      getText(buttons[4]) === getText(buttons[8])
    ) {
      console.log(`${getText(buttons[0])} diagonal Wise`);
      return true;
    } else if (
      getText(buttons[2]) === getText(buttons[4]) &&
      getText(buttons[4]) === getText(buttons[6])
    ) {
      winnerSymbol = getText(buttons[2]);
      console.log('diagonal');
      return true;
    }
  }
  return false;
}

function checkWinner() {
  if (checkForColumn() || checkForDiagonal() || checkForRows()) {
    console.log(getWinnerName(winnerSymbol));
    socket.emit('winner', getWinnerName(winnerSymbol));
    return true;
  }
  if (marked === 9) {
    socket.emit('tied');
  }
  return false;
}

socket.on('tied', () => {
  console.log('Game tied');
});

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

let mark, opponentMark;

function flipText() {
  const turn =
    state === false ? `${opponentName}'s turn` : `${yourName}'s turn`;
  document.querySelector('.turns p').innerText = turn;
}

function flipState() {
  state = !state;
  flipText();
}

socket.on('winner', (winnerName) => {
  document.querySelector('.turns p').innerText = `${winnerName} wins`;
  document.querySelector('.reset').style.display = 'block';
});

// s is player's state fetching info from server
socket.on('symbol', (symbol) => {
  mark = symbol;
  if (mark === 'X') opponentMark = 'O';
  else opponentMark = 'X';
  checkWinner();
});

socket.on('state', (stateVar) => {
  state = stateVar === 1 ? true : false;
  if (state === true) addEvents();
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
  buttons[markedTile - 1].innerText = opponentMark;
  buttons[markedTile - 1].disabled = true;
  marked++;
  checkWinner();
  flipState();
  addEvents();
});

async function playerAction(event) {
  const tileSelected = event.target.dataset.value;
  const button = event.target;
  button.innerText = mark;
  marked++;
  socket.emit('markTile', tileSelected);
  checkWinner();
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
