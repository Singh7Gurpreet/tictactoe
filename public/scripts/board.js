const buttons = document.querySelectorAll('.elementButton');
let state = false;
let opponentName, yourName;

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
        console.log(`Winner is ${getText(buttons[i])} row wise`);
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
        console.log(`Winner is ${getText(buttons[i])} column wise`);
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
      console.log(`${getText(buttons[2])} diagonal Wise`);
      return true;
    }
  }
  return false;
}

function checkWinner() {
  if (checkForColumn() || checkForDiagonal() || checkForRows()) return true;
  return false;
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
