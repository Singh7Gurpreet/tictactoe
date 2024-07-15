const express = require('express');
const session = require('express-session');
const path = require('path');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server, {});

const { joinRoom } = require('./controllers/helper');
const socketFunction = require('./controllers/socketController');
// const io = new socket.Server(http.createServer(app), {});

const pathName = path.join(__dirname, '/public');
app.use(express.static(pathName));
app.use(express.json());

const sessionMiddleWare = session({
  secret: 'your-secret-key', // No need for this I am storing name only
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
});

app.use(sessionMiddleWare);
io.use((socket, next) => {
  sessionMiddleWare(socket.request, socket.request.res || {}, next);
});

io.on('connection', (socket) => {
  socketFunction(socket);
});

app.post('/name', (req, res) => {
  const { name } = req.body;
  req.session.name = name;
  res.status(201).send({});
});

app.get('/', (req, res) => {
  console.log(req.session.room);
  res.sendFile(path.join(__dirname, '/views/loginPage.html'));
});

app.get('/joinGame', (req, res) => {
  if (req.session.name === undefined) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, '/views/joinGame.html'));
  }
});

app.post('/joinGame', (req, res) => {
  const room = req.body.room;
  if (room === undefined) {
    res.status(404).send({});
  } else {
    req.session.room = +room;
    res.sendFile(path.join(__dirname, '/views/board.html'));
  }
});

app.get('/createGame', (req, res) => {
  const roomNo = joinRoom();
  // console.log()
  if (req.session.room == undefined) req.session.room = +roomNo;
  // res.sendFile(path.join(__dirname, '/views/createGame.html'));
  res.sendFile(path.join(__dirname, '/views/board.html'));
});

server.listen(3000, () => {
  console.log('Listening to port 3000...');
});
