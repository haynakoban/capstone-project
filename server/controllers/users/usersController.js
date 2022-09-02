const { Users } = require('../../models');
const bcryptjs = require('bcryptjs');

// check if username is valid
const isUsernameValid = async (req, res, next) => {
  try {
    const { username } = req.body;

    if (!username) return res.json({ err: 'this field is required' });

    const findUser = await Users.findOne({ username }, 'username').exec();

    if (findUser) return res.json({ err: 'username is taken' });

    return res.json({ msg: 'success' });
  } catch (e) {
    next(e);
  }
};

// create new user
const createNewUser = async (req, res, next) => {
  try {
    const { name, username, email, isIntern, phoneNumber, password } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave =
      [name, username, email, phoneNumber, password].every(Boolean) &&
      (isIntern === true || isIntern === false);

    if (!canSave) return res.json({ err: 'required field must be filled' });

    // hash the password for basic security
    bcryptjs.hash(password, 10).then((hash) => {
      Users.create({
        name,
        username,
        email,
        isIntern,
        phoneNumber,
        password: hash,
      })
        .then((response) => {
          return res.json({ msg: 'success', response });
        })
        .catch((error) => {
          return res.json({ err: error });
        });
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createNewUser,
  isUsernameValid,
};
