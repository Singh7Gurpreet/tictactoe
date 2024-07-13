const express = require('express');
const session = require('express-session');
const path = require('path');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server, {});
const socketFunction = require('./controllers/socketController');
// const io = new socket.Server(http.createServer(app), {});

io.on('connection', (socket) => {
  socketFunction(socket);
});

io.on('joinRoom', (socket) => {});

const pathName = path.join(__dirname, '/public');

app.use(express.static(pathName));
app.use(express.json());

app.use(
  session({
    secret: 'your-secret-key', // No need for this I am storing name only
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.post('/name', (req, res) => {
  const { name } = req.body;
  req.session.name = name;
  console.log(req.body);
  res.status(201).send({});
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/board.html'));
});

app.get('/joinGame', (req, res) => {
  if (req.session.name === undefined) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, '/views/joinGame.html'));
  }
});

server.listen(3000, () => {
  console.log('Listening to port 3000...');
});
