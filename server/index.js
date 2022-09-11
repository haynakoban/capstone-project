const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

// db
require('./config/db');

// access port
const ACCESS_PORT = process.env.ACCESS_PORT || 5000;

// built-in middleware (cors)
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// built-in middleware (express json)
app.use(express.json());

// cookie and body parser middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/companies', require('./routes/companiesRoute'));
// app.use('/api/company', require('./routes/companyRoute'));

httpServer.listen(ACCESS_PORT, () => {
  console.log(`server running on port ${ACCESS_PORT}`);
});
