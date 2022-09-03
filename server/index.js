const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');

// db
require('./config/db');

// access port
const ACCESS_PORT = process.env.ACCESS_PORT || 5000;

// built-in middleware (cors)
app.use(cors());

// built-in middleware (express json)
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

// routes
app.use('/api/users', require('./routes/usersRoute'));
// app.use('/api/company', require('./routes/companyRoute'));

httpServer.listen(ACCESS_PORT, () => {
  console.log(`server running on port ${ACCESS_PORT}`);
});
