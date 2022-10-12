const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
require('dotenv').config();

// db
require('./config/db');
require('./config/conn');

// access port
const ACCESS_PORT = process.env.ACCESS_PORT || 5000;

// built-in middleware (cors)
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// built-in middleware (express json)
app.use(express.json());

// cookie and body parser middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// socket.io : initialization
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// routes
app.use('/api/comments', require('./routes/commentsRoute'));
app.use('/api/companies', require('./routes/companiesRoute'));
app.use('/api/posts', require('./routes/postsRoute'));
app.use('/api/tasks', require('./routes/tasksRoute'));
app.use('/api/users', require('./routes/usersRoute'));

global.onlineUsers = new Map();

// socket.io : connection
io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('disconnect', () => console.log('user logout: ', socket.id));
});

httpServer.listen(ACCESS_PORT, () => {
  console.log(`server running on port ${ACCESS_PORT}`);
});
