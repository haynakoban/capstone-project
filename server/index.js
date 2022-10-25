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
app.use('/api/attendances', require('./routes/attendancesRoute'));
app.use('/api/comments', require('./routes/commentsRoute'));
app.use('/api/companies', require('./routes/companiesRoute'));
app.use('/api/downloads', require('./routes/downloadsRoute'));
app.use('/api/notifications', require('./routes/notificationsRoute'));
app.use('/api/posts', require('./routes/postsRoute'));
app.use('/api/tasks', require('./routes/tasksRoute'));
app.use('/api/users', require('./routes/usersRoute'));

global.onlineUsers = new Map();

// socket.io : connection
io.on('connection', (socket) => {
  // socket.on('add_user', (user_id) => {
  //   onlineUsers?.set(user_id, socket.id);
  // });

  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_notif', (data) => {
    io.to(data?.notif?.company_id).emit('receive_notif', data);
  });

  socket.on('disconnect', () => console.log('user logout: ', socket.id));
});

httpServer.listen(ACCESS_PORT, () => {
  console.log(`server running on port ${ACCESS_PORT}`);
});
