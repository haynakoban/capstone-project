const { Attendances, Users } = require('../../models');
const ObjectId = require('mongodb').ObjectId;
const { formatDistance } = require('../../lib/dateFormatter');

// create new daily attendance
// post method | api/attendances
const createDailyAttendance = async (req, res, next) => {
  try {
    const { id, attendance_date, user_id, status, in_time } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id, attendance_date, user_id, status, in_time].every(
      Boolean
    );

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findAttendance = await Attendances.find({
      attendance_date,
      user_id,
    });

    if (findAttendance?.length > 0)
      return res.json({ attendance: findAttendance?.[0] });

    const createAttendance = await Attendances.create({
      attendance_date,
      in_time,
      status,
      user_id: ObjectId(user_id),
      company_id: ObjectId(id),
    });

    return res.json({ createAttendance });
  } catch (error) {
    next(error);
  }
};

// update daily attendance
// put method | api/attendances
const updateDailyAttendance = async (req, res, next) => {
  try {
    const { _id, status, in_time, out_time, name } = req.body;
    const date = new Date();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [_id, status, in_time, out_time, name].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findAttendance = await Attendances.findById({ _id });

    if (!findAttendance)
      return res.json({ err: 'cannot find attendance with id ', _id });

    findAttendance.status = status;
    findAttendance.in_time = new Date(`${in_time}`);
    findAttendance.out_time = out_time;
    findAttendance.total_hours = formatDistance(in_time, out_time);
    findAttendance.updatedAt = date;

    const updatedAttendance = await findAttendance?.save();

    return res.json({ attendance: updatedAttendance, name });
  } catch (error) {
    next(error);
  }
};

// fetch Daily Attendance
// get method | api/attendances/:id/:attendance_date
const fetchDailyAttendance = async (req, res, next) => {
  try {
    const { id, attendance_date } = req.params;

    if (!id && !attendance_date)
      return res
        .status(400)
        .json({ err: 'company id and attendance date should be provided' });

    const attendances = await Attendances.find({
      $and: [{ company_id: id }, { attendance_date }],
    });

    if (!attendances)
      return res.json({ err: 'cannot find attendance with id ', id });

    const ids = attendances.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    return res.json({ attendances, users });
  } catch (e) {
    next(e);
  }
};

// fetch Summary Attendance
// get method | api/attendances/:id
const fetchSummaryAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ err: 'company id and attendance date should be provided' });

    const attendances = await Attendances.find({
      company_id: id,
    });

    if (!attendances)
      return res.json({ err: 'cannot find attendance with id ', id });

    const ids = attendances.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    return res.json({ attendances, users });
  } catch (e) {
    next(e);
  }
};

// on logged out, create out time on daily attendance
// put method | api/attendances/:id
const outTimeDailyAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { attendance_date } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id, attendance_date].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findAttendance = await Attendances.find({
      id,
      attendance_date,
    });
    console.log(findAttendance);

    if (!findAttendance?.[0])
      return res.json({ err: 'cannot find attendance with id ', id });

    // edit this later,
    // kapag yung out time ni user ay lampas sa out time settings ng company
    // di na counted ang out time ni user

    // return res.json({ createAttendance });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDailyAttendance,
  fetchDailyAttendance,
  fetchSummaryAttendance,
  outTimeDailyAttendance,
  updateDailyAttendance,
};
