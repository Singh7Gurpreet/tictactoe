const joinBtn = document.querySelector('.game-button');
const input = document.querySelector('.form-control');

joinBtn.addEventListener('click', async (event) => {
  console.log('Clicked');
  if (input.value == '') alert('Please enter! room number');
  else {
    const response = await axios.post('http://localhost:3000/joinGame', {
      room: input.value,
    });
    if (response.status == 404) alert('Enter valid room name');
    else {
      window.location.href = './createGame';
    }
  }
});
