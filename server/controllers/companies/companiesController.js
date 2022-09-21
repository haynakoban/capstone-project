const { Companies, Users } = require('../../models');

const genRoomCode = () => {
  return require('crypto').randomBytes(10).toString('base64url');
};

// create new room
// post method | /api/companies
const createRoom = async (req, res, next) => {
  try {
    const { roomName, companyName, description, showRoom, id } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave =
      [roomName, companyName, id].every(Boolean) &&
      (showRoom === true || showRoom === false);

    const roomCode = genRoomCode();

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    // create new room
    const company = await Companies.create({
      roomName,
      companyName,
      description,
      showRoom,
      roomCode,
      createdBy: id,
      members: [{ id, roles: 'owner' }],
    });

    const user = await Users.findById({ _id: id }, '-internInfo');

    if (!user) return res.json({ err: 'cannot find user' });
    if (!company) return res.json({ err: 'error' });

    user.employeeInfo.listOfCompanies.push({ companyId: company._id });

    user.save();

    return res.status(201).json({ company });
  } catch (e) {
    next(e);
  }
};

// retrieve rooms
// get method | /api/companies
const getRooms = async (req, res, next) => {
  try {
    const company = await Companies.find({ showRoom: true }).limit(16);

    if (!company) return res.json({ err: 'no rooms available' });

    return res.json({ company });
  } catch (e) {
    next(e);
  }
};

// retrieve the list of rooms by using the id
// get method | /api/companies/:id
const getMyRoom = async (req, res, next) => {
  try {
    const id = req.params.id;

    const findCompany = await Companies.find({ 'members.id': id });

    if (!findCompany) return res.json({ err: 'room name is taken' });

    return res.json({ rooms: findCompany });
  } catch (e) {
    next(e);
  }
};

// check if room name is valid
// post method | /api/companies/validate
// const isRoomNameValid = async (req, res, next) => {
//   try {
//     const { name } = req.body;

//     if (!name) return res.json({ err: 'this field is required' });

//     const findCompany = await Companies.findOne({ name }, 'name');

//     if (findCompany) return res.json({ err: 'room name is taken' });

//     return res.json({ msg: 'success' });
//   } catch (e) {
//     next(e);
//   }
// };

// join a room (for employee)
// post method | /api/companies/validate
const joinRoom = async (req, res, next) => {
  try {
    const { companyName, roomCode, id } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [companyName, roomCode, id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    // join in a company
    const company = await Companies.findOne({
      companyName,
      roomCode,
    }).exec();

    // check if the user is already in the room
    const isJoined = company?.members.some((e) => e.id === id);

    // if user is in the room aldreay return err
    if (isJoined) return res.json({ err: 'user is already in the room' });

    // validate if the company exist, if not the system will send an error
    if (!company) return res.json({ err: 'invalid code or company name' });

    // if the user successfully enter the correct code for the room and company name.
    // this code add the user in the company as member
    company.members.push({ id, roles: 'member' });
    company.save();

    // find the user with the id: id
    const user = await Users.findById({ _id: id }, '-internInfo');

    if (!user) return res.json({ err: 'cannot find user' });

    // this line of code add the company in the user collection as one of its company
    user.employeeInfo.listOfCompanies.push({ companyId: company._id });

    user.save();

    return res.status(201).json({ rooms: company });
  } catch (e) {
    next(e);
  }
};

// retrieve the room information
// get method | /api/companies/validate
const getRoomInfo = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createRoom,
  getMyRoom,
  getRoomInfo,
  getRooms,
  joinRoom,
  // isRoomNameValid,
};
