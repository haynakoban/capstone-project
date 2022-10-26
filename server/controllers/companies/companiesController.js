const { Companies, Users } = require('../../models');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const DB_URL = process.env.MONGO_URL;

const conn = mongoose.createConnection(DB_URL);

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

    user.employeeInfo.listOfCompanies.push({ company_id: company._id });

    await user.save();

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
    company.members.push({ id, roles: 'owner' });
    company.save();

    // find the user with the id: id
    const user = await Users.findById({ _id: id }, '-internInfo');

    if (!user) return res.json({ err: 'cannot find user' });

    // this line of code add the company in the user collection as one of its company
    user.employeeInfo.listOfCompanies.push({ company_id: company._id });

    user.save();

    return res.status(201).json({ rooms: company });
  } catch (e) {
    next(e);
  }
};

// retrieve the room information
// get method | /api/companies/auth/:id
const getRoomInfo = async (req, res, next) => {
  try {
    const id = req.params.id;

    const room = await Companies.findById(id);

    if (!room) return res.json({ err: `no room found` });

    const ids = room?.members.map((e) => e.id);
    const req_ids = room?.request.map((e) => e.user_id);
    const pen_ids = room?.pending.map((e) => e.user_id);
    const req_file_ids = room?.request.map((e) => e.file_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();
    const req_users = await Users.find(
      { _id: { $in: req_ids } },
      'name'
    ).exec();
    const pen_users = await Users.find(
      { _id: { $in: pen_ids } },
      'name'
    ).exec();

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const cursor = bucket.find({ _id: { $in: req_file_ids } });
    const files = await cursor.toArray();

    if (!users) return res.json({ err: `no users found` });
    if (!req_users) return res.json({ err: `no users found` });

    return res.json({ room, users, req_users, pen_users, files });
  } catch (e) {
    next(e);
  }
};

// add company description
// put method | /api/companies/:id
const addDescription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!id) return res.json({ err: `invalid room id` });

    const room = await Companies.findById(id);

    if (!room) return res.json({ err: `no room found` });

    if (description === '') room.description = '';
    else room.description = description;

    const updatedRoom = await room.save();

    return res.json({ room: updatedRoom });
  } catch (error) {
    next(error);
  }
};

// accept intern request
// put method | /api/companies/:id/:user_id
const acceptIntern = async (req, res, next) => {
  try {
    const { id, user_id } = req.params;
    const date = new Date();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id, user_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const room = await Companies.findById(id);

    if (!room) return res.json({ err: `no room found` });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const updatedRequestList = room?.request?.filter(
      (res) => res?.user_id !== user_id
    );

    const find_file_id = room?.request?.filter(
      (res) => res?.user_id === user_id
    );

    bucket.delete(find_file_id?.[0]?.file_id);

    room.request = updatedRequestList;
    room.pending?.push({ user_id, createdAt: date });

    const updatedRoom = await room.save();

    const findUser = await Users.findById(
      { _id: user_id },
      '-employeeInfo'
    ).exec();

    if (!findUser) return res.json({ err: `no user found` });

    const pending = findUser?.internInfo?.pending?.filter(
      (p) => p.company_id !== id
    );

    findUser.internInfo.pending = pending;
    findUser?.internInfo?.offers?.push({
      company_id: room?._id,
      company_name: room?.companyName,
      createdAt: date,
    });

    await findUser.save();

    const ids = room?.members.map((e) => e.id);
    const pen_ids = room?.pending.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();
    const pen_users = await Users.find(
      { _id: { $in: pen_ids } },
      'name'
    ).exec();

    if (updatedRequestList?.length > 0) {
      const req_file_ids = updatedRequestList.map((e) => e.file_id);
      const req_ids = room?.request.map((e) => e.user_id);
      const req_users = await Users.find(
        { _id: { $in: req_ids } },
        'name'
      ).exec();

      const cursor = bucket.find({ _id: { $in: req_file_ids } });
      const files = await cursor.toArray();

      return res.json({
        room: updatedRoom,
        users,
        files,
        req_users,
        pen_users,
      });
    }

    return res.json({ room: updatedRoom, users, pen_users });
  } catch (error) {
    next(error);
  }
};

// decline intern request
// delete method | /api/companies/:id/:user_id
const declineInternRequest = async (req, res, next) => {
  try {
    const { id, user_id } = req.params;
    const date = new Date();
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id, user_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const room = await Companies.findById(id);
    if (!room) return res.json({ err: `no room found` });

    const user = await Users.findById({ _id: user_id }, '-employeeInfo').exec();
    if (!user) return res.json({ err: `no user found` });

    if (room?.request?.length > 0) {
      const delete_file = room?.request?.filter((p) => p?.user_id == user_id);
      const pop_user = room?.request?.filter((p) => p?.user_id != user_id);

      await bucket.delete(ObjectId(delete_file?.[0]?.file_id));

      room.request = pop_user;
    }
    room.updatedAt = date;
    await room?.save();

    if (user?.internInfo?.pending?.length > 0) {
      const pop_user = user?.internInfo?.pending?.filter(
        (u) => u.company_id != id
      );
      user.internInfo.pending = pop_user;
    }
    user.updatedAt = date;
    await user?.save();

    return res.json({ company_id: id, user_id });
  } catch (error) {
    next(error);
  }
};

// toggle start and end time
// put method | api/companies/auth/:id
const toogleStartAndEndTime = async (req, res, next) => {
  try {
    const { id } = req.params;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const room = await Companies.findById(id);
    if (!room) return res.json({ err: `no room found` });

    if (req.body?.start_time && req.body?.end_time) {
      if (req.body?.isOn) {
        room.time.isOn = req.body?.isOn;
        room.time.start_time = req.body?.start_time;
        room.time.end_time = req.body?.end_time;
      } else {
        room.time.isOn = req.body?.isOn;
      }
    } else if (req.body?.start_time) {
      if (req.body?.isOn) {
        room.time.start_time = req.body?.start_time;
      }
    } else if (req.body?.end_time) {
      if (req.body?.isOn) {
        room.time.end_time = req.body?.end_time;
      }
    }

    const updatedRoom = await room?.save();

    return res.json({ room: updatedRoom });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  acceptIntern,
  addDescription,
  createRoom,
  declineInternRequest,
  getMyRoom,
  getRoomInfo,
  getRooms,
  joinRoom,
  toogleStartAndEndTime,
  // isRoomNameValid,
};
