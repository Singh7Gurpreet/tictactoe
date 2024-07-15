const joinButton = document.querySelector('.joinButton');
const createButton = document.querySelector('.createButton');

function isVerified(name) {
  let result = /^[a-zA-Z ]+$/.test(name);
  return result;
}

joinButton.addEventListener('click', async (event) => {
  const name = document.querySelector('input');
  if (isVerified(name.value) === false) {
    name.classList.add('is-invalid');
  } else {
    const response = await axios.post('http://localhost:3000/name', {
      name: name.value,
    });

    window.location.href = './joinGame';
  }
});

createButton.addEventListener('click', async (event) => {
  const name = document.querySelector('input');
  if (isVerified(name.value) === false) {
    name.classList.add('is-invalid');
  } else {
    const response = await axios.post('http://localhost:3000/name', {
      name: name.value,
    });
    window.location.href = '/createGame';
  }
});
