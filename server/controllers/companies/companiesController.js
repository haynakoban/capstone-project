const { Companies } = require('../../models');

// create new room
// post method | /api/companies
const createRoom = async (req, res, next) => {
  try {
    const { name, createdBy } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [name, createdBy].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    // create new room
    const company = await Companies.create({
      name,
      createdBy,
    });

    if (!company) return res.json({ err: 'error' });

    return res.status(201).json({ company });
  } catch (e) {
    next(e);
  }
};

// retrieve the room information
// get method | /api/companies
const getRoomInfo = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};

// retrieve the company id
// get method | /api/companies/:id
const getRoomId = async (req, res, next) => {
  try {
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

module.exports = {
  createRoom,
  getRoomId,
  getRoomInfo,
  isRoomNameValid,
};
