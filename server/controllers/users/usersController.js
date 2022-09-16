const { Users } = require('../../models');
const bcryptjs = require('bcryptjs');

// check if username is valid
// post method | /api/users/validation
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
// post method | /api/users
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

    let userProps;
    if (isIntern) {
      userProps = {
        hasCompany: false,
        workingHours: {
          completed: 0,
          remaining: 0,
        },
      };
    } else {
      userProps = {
        hasCompany: false,
      };
    }

    const user = await Users.create({
      name,
      username,
      email,
      isIntern,
      phoneNumber,
      password: hashPassword,
      internInfo: isIntern && userProps,
      employeeInfo: !isIntern && userProps,
    });

    if (!user) return res.json({ err: 'error' });

    // set the session cookie
    req.session.user_id = user._id.toJSON();

    return res.status(201).json({ username: username, _id: user._id });
  } catch (e) {
    next(e);
  }
};

// user log in: check weather the user can log in from the system
// post method | /api/users/auth
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

// get the logged in user
// get method | /api/users/auth
const isUserLoggedIn = async (req, res, next) => {
  try {
    if (!req.session.user_id) return res.json({ userLoggedIn: false });

    return res.json({ userLoggedIn: true, user_id: req.session.user_id });
  } catch (error) {
    next(error);
  }
};

// get the user information
// get method | /api/users/auth/:id
const getUserInfo = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await Users.findById(id);

    if (!user) return res.json({ err: `no user found` });

    return res.json({
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

// update the user profile information
// put method | api/users/auth/:id
const updateUserProfileInfo = async (req, res, next) => {
  try {
    const id = req.params.id;

    const findUser = await Users.findById(id).exec();

    if (!findUser) return res.json({ err: `no data found with the id: ${id}` });

    // update name, address and gender
    if (req.body.name || req.body.address || req.body.gender) {
      const { name, address, gender } = req.body;
      const date = new Date();

      if (!name) return res.json({ err: `name field is required` });

      findUser.name = name;
      if (address) findUser.address = address;
      else if (address === '') findUser.address = '';

      if (gender) findUser.gender = gender;
      else if (gender === '') findUser.gender = '';

      findUser.updatedAt = date;

      const updatedProfile = await findUser.save();

      return res.json({ user: updatedProfile });
    }
    // update phone number and email
    else if (req.body.phoneNumber || req.body.email) {
      const { phoneNumber, email } = req.body;
      const date = new Date();

      if (!phoneNumber && !email)
        return res.json({ err: `phoneNumber and Email fields are required` });

      findUser.phoneNumber = phoneNumber;
      findUser.email = email;
      findUser.updatedAt = date;

      const updatedProfile = await findUser.save();

      return res.json({ user: updatedProfile });
    }
    // update company name, department and position
    else if (req.body.companyName || req.body.department || req.body.position) {
      const { companyName, department, position } = req.body;
      const date = new Date();

      if (companyName) findUser.employeeInfo.companyName = companyName;
      else if (companyName === '') findUser.employeeInfo.companyName = '';

      if (department) findUser.employeeInfo.department = department;
      else if (department === '') findUser.employeeInfo.department = '';

      if (position) findUser.employeeInfo.position = position;
      else if (position === '') findUser.employeeInfo.position = '';

      findUser.updatedAt = date;

      const updatedProfile = await findUser.save();

      return res.json({ user: updatedProfile });
    }
    // update school name, course and major
    else if (req.body.schoolName || req.body.course || req.body.major) {
      const { schoolName, course, major } = req.body;
      const date = new Date();

      if (schoolName) findUser.internInfo.schoolName = schoolName;
      else if (schoolName === '') findUser.internInfo.schoolName = '';

      if (course) findUser.internInfo.course = course;
      else if (course === '') findUser.internInfo.course = '';

      if (major) findUser.internInfo.major = major;
      else if (major === '') findUser.internInfo.major = '';

      findUser.updatedAt = date;

      const updatedProfile = await findUser.save();

      return res.json({ user: updatedProfile });
    }
  } catch (error) {
    next(error);
  }
};

// log out the user
// get method | /api/users/validation
const userLogout = async (req, res, next) => {
  try {
    if (!req.session.user_id) return res.json({ userLoggedIn: false });

    res.clearCookie('_uid');

    return res.json({ userLoggedIn: false });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
  getUserInfo,
  isUsernameValid,
  isUserLoggedIn,
  updateUserProfileInfo,
  userLogin,
  userLogout,
};
