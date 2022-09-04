const { Users } = require('../../models');
const bcryptjs = require('bcryptjs');

// check if username is valid
const isUsernameValid = async (req, res, next) => {
  try {
    const { username } = req.body;

    if (!username) return res.json({ err: 'this field is required' });

    const findUser = await Users.findOne({ username }, 'username');

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

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    // hash the password for basic security
    const hashPassword = await bcryptjs.hash(password, 10);

    const user = await Users.create({
      name,
      username,
      email,
      isIntern,
      phoneNumber,
      password: hashPassword,
    });

    if (!user) return res.json({ err: error });

    // set the session cookie
    req.session.user_id = user._id.toJSON();

    return res.status(201).json({ username: username, _id: user._id });
  } catch (e) {
    next(e);
  }
};

// user log in: check weather the user can log in from the system
const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findUser = await Users.findOne({ username }, '_id username password');

    if (!findUser) return res.json({ err: 'incorrect username' });

    bcryptjs.compare(password, findUser?.password).then((match) => {
      if (!match) return res.json({ err: 'incorrect username and password' });

      // set the session cookie
      req.session.user_id = findUser._id.toJSON();

      return res.json({ username, _id: findUser._id });
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createNewUser,
  isUsernameValid,
  userLogin,
};
