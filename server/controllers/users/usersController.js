const { Companies, Users } = require('../../models');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const DB_URL = process.env.MONGO_URL;

const conn = mongoose.createConnection(DB_URL);

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

// change username
// post method | /api/users/validation/username
const changeUsername = async (req, res, next) => {
  try {
    const { username, oldUsername } = req.body;

    if (username === oldUsername) return res.json({ succ: true });

    if (!username) return res.json({ err: 'this field is required' });

    const findUser = await Users.findOne({ username }, 'username');

    if (findUser) return res.json({ err: 'username is taken' });

    return res.json({ msg: 'success' });
  } catch (e) {
    next(e);
  }
};

// validate password
// post method | /api/users/validation/password
const validatePassword = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    if (!id) return res.json({ err: 'this field is required' });

    const findUser = await Users.findById({ _id: id }, 'username password');

    if (!findUser) return res.json({ err: 'no user found' });

    // validating the password
    bcryptjs.compare(password, findUser?.password).then((match) => {
      if (!match) return res.json({ err: 'incorrect password' });

      return res.json({ msg: 'success' });
    });
  } catch (e) {
    next(e);
  }
};

// change account info
// put method | /api/users/validation/username
const changeAccountInfo = async (req, res, next) => {
  try {
    const { id, username, password } = req.body;
    const date = new Date();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id, username, password].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findUser = await Users.findById(
      { _id: id },
      'username password updatedAt'
    );

    if (!findUser) return res.json({ err: 'no user found' });

    // hash the password for basic security
    const hashPassword = await bcryptjs.hash(password, 10);

    findUser.username = username;
    findUser.password = hashPassword;
    findUser.updatedAt = date;

    const updatedUser = await findUser?.save();

    return res.json({ msg: 'success', user: updatedUser });
  } catch (e) {
    next(e);
  }
};

// create new user
// post method | /api/users
const createNewUser = async (req, res, next) => {
  try {
    const { name, username, email, isIntern, password } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave =
      [name, username, email, password].every(Boolean) &&
      (isIntern === true || isIntern === false);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    // hash the password for basic security
    const hashPassword = await bcryptjs.hash(password, 10);

    let userProps;
    if (isIntern === 'true' || isIntern) {
      userProps = {
        companyInfo: {
          hasCompany: false,
        },
      };
    } else {
      userProps = {
        company: {
          name: req?.body?.companyName,
        },
      };
    }

    const user = await Users.create({
      name,
      username,
      email,
      isIntern,
      password: hashPassword,
      internInfo: isIntern && userProps,
      employeeInfo: !isIntern && userProps,
    });

    if (!user) return res.json({ err: 'error' });

    if (isIntern === 'true' || isIntern) {
      // set the session cookie
      req.session.user_id = user._id.toJSON();
    }

    return res.status(201).json({ username: username, _id: user._id, user });
  } catch (e) {
    next(e);
  }
};

// user log in: check weather the user can log in from the system
// post method | /api/users/auth
const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findUser = await Users.findOne(
      { username },
      '_id username password isIntern isAdmin'
    );

    if (!findUser) return res.json({ err: 'incorrect username' });

    bcryptjs.compare(password, findUser?.password).then((match) => {
      if (!match) return res.json({ err: 'incorrect username and password' });

      // set the session cookie
      req.session.user_id = findUser._id.toJSON();

      return res.json({
        username,
        _id: findUser._id,
        user_type: findUser?.isIntern,
        isAdmin: findUser?.isAdmin,
      });
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

    const user = await Users.findById(id, 'isIntern');

    if (!user) return res.json({ err: `no user found` });

    if (user.isIntern) {
      const find_user = await Users.findById(id, '-employeeInfo');

      return res.json({ user: find_user });
    } else {
      const find_user = await Users.findById(id, '-internInfo');

      return res.json({ user: find_user });
    }
  } catch (error) {
    next(error);
  }
};

// update the user profile information
// put method | api/users/auth/:id
const updateUserProfileInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { isIntern } = req.body;

    let findUser;

    if (isIntern) {
      findUser = await Users.findById(id, '-employeeInfo').exec();
    } else {
      findUser = await Users.findById(id, '-internInfo').exec();
    }

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

      if (companyName) findUser.employeeInfo.company.name = companyName;
      else if (companyName === '') findUser.employeeInfo.company.name = '';

      if (department) findUser.employeeInfo.company.department = department;
      else if (department === '') findUser.employeeInfo.company.department = '';

      if (position) findUser.employeeInfo.company.position = position;
      else if (position === '') findUser.employeeInfo.company.position = '';

      findUser.updatedAt = date;

      const updatedProfile = await findUser.save();

      return res.json({ user: updatedProfile });
    }
    // update school name, course and major
    else if (req.body.schoolName || req.body.course || req.body.major) {
      const { schoolName, course, major } = req.body;
      const date = new Date();

      if (schoolName) findUser.internInfo.school.name = schoolName;
      else if (schoolName === '') findUser.internInfo.school.name = '';

      if (course) findUser.internInfo.school.course = course;
      else if (course === '') findUser.internInfo.school.course = '';

      if (major) findUser.internInfo.school.major = major;
      else if (major === '') findUser.internInfo.school.major = '';

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

// apply for internship
// post method | /api/users/uploads
const uploadFile = async (req, res, next) => {
  try {
    const { company_id, user_id } = req.body;

    const date = new Date();

    const findCompany = await Companies.findById({ _id: company_id });
    const findUser = await Users.findById({ _id: user_id }, '-employeeInfo');

    if (!findCompany || !findUser)
      return res.json({ err: `no compamy found with an id: ${company_id}` });

    // check if the user is already in the apply in this company
    const req_apply = findCompany?.request?.some((e) => e.user_id === user_id);
    const pen_apply = findCompany?.pending?.some((e) => e.user_id === user_id);

    const pen_apply_user = findUser?.internInfo?.pending?.some(
      (e) => e.company_id == company_id
    );
    const offer_apply_user = findUser?.internInfo?.offers?.some(
      (e) => e.company_id == company_id
    );

    // if user is in the room aldreay return err
    if ((req_apply || pen_apply) && (pen_apply_user || offer_apply_user))
      return res.json({
        err: 'user is already applied in this company',
        file_id: req.file.id,
      });

    findCompany.request.push({
      user_id,
      file_id: req.file.id,
      createdAt: date,
    });

    findUser.internInfo.pending.push({
      company_id,
      company_name: findCompany.companyName,
      createdAt: date,
    });

    findCompany.save();
    findUser.save();

    return res.json({ file: req.file, company: findCompany });
  } catch (e) {
    next(e);
  }
};

// update the user documents under the resume settings
// put method | /api/users/uploads
const updateUserDocs = async (req, res, next) => {
  try {
    const { _id, isIntern } = req.body;
    const date = new Date();

    let findUser;

    if (isIntern === 'true') {
      findUser = await Users.findById(_id, '-employeeInfo').exec();
    } else if (isIntern === 'false') {
      findUser = await Users.findById(_id, '-internInfo').exec();
    }

    if (!findUser)
      return res.json({ err: `no data found with the id: ${_id}` });

    if (req.files?.resume)
      findUser.docs.resume = {
        file_id: req.files?.resume[0].id,
        file_name: req.files?.resume[0].originalname,
        createdAt: date,
      };
    if (req.files?.cv)
      findUser.docs.cv = {
        file_id: req.files?.cv[0].id,
        file_name: req.files?.cv[0].originalname,
        createdAt: date,
      };
    if (req.files?.letter)
      findUser.docs.letter = {
        file_id: req.files?.letter[0].id,
        file_name: req.files?.letter[0].originalname,
        createdAt: date,
      };

    findUser.updatedAt = date;
    const updatedProfile = await findUser.save();

    return res.json({ user: updatedProfile });
  } catch (e) {
    next(e);
  }
};

// accept company offer and delete other request
// put method | /api/users/:user_id/:company_id
const acceptCompanyOffer = async (req, res, next) => {
  try {
    const { user_id, company_id } = req.params;
    const date = new Date();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [user_id, company_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const room = await Companies.findById(company_id).exec();
    if (!room) return res.json({ err: `no room found` });

    // add the user in company
    room.members?.push({ id: user_id, roles: 'member' });
    if (room?.pending?.length > 0) {
      const pop_user = room.pending?.filter((u) => u.user_id != user_id);
      room.pending = pop_user;
    }
    room.updatedAt = date;
    const updatedRoom = await room?.save();

    const user = await Users.findById({ _id: user_id }, '-employeeInfo').exec();
    if (!user) return res.json({ err: `no user found` });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    if (user?.internInfo?.pending?.length > 0) {
      cp_id = user?.internInfo?.pending?.map((f) => f.company_id);

      const find_room = await Companies.find({ _id: { $in: cp_id } }).exec();

      for (const new_room of find_room) {
        const delete_file = new_room.request?.filter(
          (u) => u.user_id == user_id
        );
        const req_pop_user = new_room.request?.filter(
          (u) => u.user_id != user_id
        );

        await bucket.delete(ObjectId(delete_file?.[0]?.file_id));

        new_room.request = req_pop_user;
        new_room.updatedAt = date;
        await new_room?.save();
      }
    }

    if (user?.internInfo?.offers?.length > 0) {
      cp_id = user?.internInfo?.offers?.map((f) => f.company_id);

      const find_room = await Companies.find({ _id: { $in: cp_id } }).exec();

      for (const new_room of find_room) {
        const pen_pop_user = new_room.pending?.filter(
          (u) => u.user_id != user_id
        );
        new_room.pending = pen_pop_user;

        new_room.updatedAt = date;
        await new_room?.save();
      }
    }

    // remove all the user request
    user.internInfo.companyInfo.hasCompany = true;
    user.internInfo.companyInfo.company_id = room?._id;
    user.internInfo.pending = [];
    user.internInfo.offers = [];
    user.updatedAt = date;
    const updatedUser = await user.save();

    res.json({ room: updatedRoom, user: updatedUser });
  } catch (e) {
    next(e);
  }
};

// delete company offer
// delete method | /api/users/:user_id/:company_id
const declineCompanyOffer = async (req, res, next) => {
  try {
    const { user_id, company_id } = req.params;
    const date = new Date();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [user_id, company_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const room = await Companies.findById(company_id).exec();
    if (!room) return res.json({ err: `no room found` });

    if (room?.pending?.length > 0) {
      const pop_user = room.pending?.filter((u) => u.user_id != user_id);
      room.pending = pop_user;
    }
    room.updatedAt = date;
    const updatedRoom = await room?.save();

    const user = await Users.findById({ _id: user_id }, '-employeeInfo').exec();
    if (!user) return res.json({ err: `no user found` });

    if (user?.internInfo?.offers?.length > 0) {
      const pop_user = user?.internInfo?.offers?.filter(
        (u) => u.company_id != company_id
      );
      user.internInfo.offers = pop_user;
    }

    user.updatedAt = date;
    const updatedUser = await user?.save();

    return res.json({ user: updatedUser, room: updatedRoom });
  } catch (e) {
    next(e);
  }
};

// leave room
// put method | /api/users/leave/:id
const leaveRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ err: 'id must have value' });

    const findUser = await Users.findById({ _id: id }, '-employeeInfo');

    if (!findUser) return res.json({ err: 'cannot find user with id ', id });

    const findCompany = await Companies.findById({
      _id: findUser.internInfo.companyInfo.company_id,
    });

    if (!findCompany) return res.json({ err: 'cannot find room' });

    const members = findCompany?.members?.filter((m) => m?.id !== id);

    findCompany.members = members;

    await findCompany.save();

    findUser.internInfo.companyInfo.hasCompany = false;
    findUser.internInfo.companyInfo.company_id = null;

    const updatedUser = await findUser.save();

    return res.json({ msg: 'success', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// get all users
// get method | /api/users/admin/:type
const getUsers = async (req, res, next) => {
  try {
    const { type } = req.params;

    if (type === 'true') {
      const findUsers = await Users.find(
        { isIntern: true },
        '-employeeInfo'
      ).sort({
        createdAt: -1,
        updatedAt: -1,
      });

      return res.json({ users: findUsers, type: 'interns' });
    } else {
      const findUsers = await Users.find(
        { isIntern: false },
        '-internInfo'
      ).sort({
        createdAt: -1,
        updatedAt: -1,
      });

      return res.json({ users: findUsers, type: 'companies' });
    }
  } catch (error) {
    next(error);
  }
};

// search users
// post method | /api/users/admin/:type
const searchUsers = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { keyword } = req.body;

    if (type === 'true') {
      if (!keyword) {
        const findUsers = await Users.find(
          {
            $and: [{ isIntern: true }],
          },
          '-employeeInfo'
        ).sort({
          createdAt: -1,
          updatedAt: -1,
        });

        if (findUsers?.length > 0) {
          return res.json({ users: findUsers, type: 'interns' });
        }

        return res.json({ err: 'No results matched', type: 'interns' });
      } else {
        const findUsers = await Users.find(
          {
            $and: [
              { isIntern: true },
              {
                $or: [
                  { name: { $regex: keyword, $options: 'i' } },
                  { username: { $regex: keyword, $options: 'i' } },
                  { email: { $regex: keyword, $options: 'i' } },
                ],
              },
            ],
          },
          '-employeeInfo'
        ).sort({
          createdAt: -1,
          updatedAt: -1,
        });

        if (findUsers?.length > 0) {
          return res.json({ users: findUsers, type: 'interns' });
        }

        return res.json({ err: 'No results matched', type: 'interns' });
      }
    } else {
      if (!keyword) {
        const findUsers = await Users.find(
          {
            $and: [{ isIntern: false }],
          },
          '-internInfo'
        ).sort({
          createdAt: -1,
          updatedAt: -1,
        });

        if (findUsers?.length > 0) {
          return res.json({ users: findUsers, type: 'companies' });
        }

        return res.json({ err: 'No results matched', type: 'companies' });
      } else {
        const findUsers = await Users.find(
          {
            $and: [
              { isIntern: false },
              {
                $or: [
                  { name: { $regex: keyword, $options: 'i' } },
                  { username: { $regex: keyword, $options: 'i' } },
                  { email: { $regex: keyword, $options: 'i' } },
                ],
              },
            ],
          },
          '-internInfo'
        ).sort({
          createdAt: -1,
          updatedAt: -1,
        });

        if (findUsers?.length > 0) {
          return res.json({ users: findUsers, type: 'companies' });
        }

        return res.json({ err: 'No results matched', type: 'companies' });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  acceptCompanyOffer,
  changeAccountInfo,
  changeUsername,
  createNewUser,
  declineCompanyOffer,
  getUsers,
  getUserInfo,
  isUsernameValid,
  isUserLoggedIn,
  leaveRoom,
  searchUsers,
  updateUserDocs,
  updateUserProfileInfo,
  userLogin,
  userLogout,
  uploadFile,
  validatePassword,
};
