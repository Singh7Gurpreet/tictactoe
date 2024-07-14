const joinRoom = () => {
  let id = Math.floor(Math.random() * 9000) + 1000;
  return id;
};

module.exports = { joinRoom };
