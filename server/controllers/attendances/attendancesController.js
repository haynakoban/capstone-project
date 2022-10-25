const { Attendances, Users } = require('../../models');
const ObjectId = require('mongodb').ObjectId;

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
      return res.json({ err: 'attendance is already created' });

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

module.exports = {
  createDailyAttendance,
  fetchDailyAttendance,
};
