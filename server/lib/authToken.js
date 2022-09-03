const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxAge = 7 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports = { createToken, maxAge };
