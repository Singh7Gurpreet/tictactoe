const buttons = document.querySelectorAll('.elementButton');
const socket = io();

async function postRequest(tileSelected) {
  console.log(tileSelected);
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    postRequest(event.target.dataset.value);
  });
});

//will receive socket from server to apply changes
//made by opponent on board
