const { Companies, Users } = require('../../models');

// create new room
// post method | /api/companies
const createRoom = async (req, res, next) => {
  try {
    const { name, createdBy, members } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [name, createdBy, members].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    // create new room
    const company = await Companies.create({
      name,
      createdBy,
      members,
    });

    const user = await Users.findById({ _id: members });

    if (!user) return res.json({ err: 'cannot find user' });
    if (!company) return res.json({ err: 'error' });

    user.employeeInfo.listOfCompanies.push({
      companyId: company._id,
      name: company.name,
    });

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
    const company = await Companies.find().limit(16);

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

    const findCompany = await Companies.find({ members: id });

    if (!findCompany) return res.json({ err: 'room name is taken' });

    return res.json({ rooms: findCompany });
  } catch (e) {
    next(e);
  }
};

// check if room name is valid
// post method | /api/companies/validate
const isRoomNameValid = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) return res.json({ err: 'this field is required' });

    const findCompany = await Companies.findOne({ name }, 'name');

    if (findCompany) return res.json({ err: 'room name is taken' });

    return res.json({ msg: 'success' });
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
  isRoomNameValid,
};
