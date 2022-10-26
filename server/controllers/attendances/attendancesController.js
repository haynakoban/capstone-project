const { Attendances, Users, Companies } = require('../../models');
const ObjectId = require('mongodb').ObjectId;
const {
  formatDistance,
  isStartAndEndTime,
} = require('../../lib/dateFormatter');

// validate attendance date
const validateAttendanceDate = (date) => {
  switch (date) {
    case '01':
      return 'January';
    case '02':
      return 'February';
    case '03':
      return 'March';
    case '04':
      return 'April';
    case '05':
      return 'May';
    case '06':
      return 'June';
    case '07':
      return 'July';
    case '08':
      return 'August';
    case '09':
      return 'September';
    case '10':
      return 'October';
    case '11':
      return 'November';
    case '12':
      return 'December';
    default:
      return '';
  }
};

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

    const findCompany = await Companies.findById(id);

    if (!findCompany) {
      return res.json({ err: 'cannot find company with id ', id });
    }

    const findAttendance = await Attendances.find({
      attendance_date,
      user_id,
    });

    if (findAttendance?.length > 0)
      return res.json({ attendance: findAttendance?.[0] });

    if (findCompany?.time?.isOn) {
      // check if the in time is after the start time of the company settings
      if (
        isStartAndEndTime(
          findCompany?.time?.start_time,
          in_time,
          findCompany?.time?.end_time
        )
      ) {
        const createAttendance = await Attendances.create({
          attendance_date,
          in_time,
          status,
          user_id: ObjectId(user_id),
          company_id: ObjectId(id),
        });

        return res.json({ createAttendance });
      }
    } else {
      const createAttendance = await Attendances.create({
        attendance_date,
        in_time,
        status,
        user_id: ObjectId(user_id),
        company_id: ObjectId(id),
      });

      return res.json({ createAttendance });
    }
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
    const { attendance_date, out_time } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id, attendance_date, out_time].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findAttendance = await Attendances.findById(id);

    if (!findAttendance)
      return res.json({ err: 'cannot find attendance with id ', id });

    const findCompany = await Companies.findById(findAttendance?.company_id);

    if (!findCompany) {
      return res.json({ err: 'cannot find company with id ', id });
    }

    if (findCompany.time.isOn) {
      // check if the in time is after the start time of the company settings
      if (
        isStartAndEndTime(
          findCompany?.time?.start_time,
          out_time,
          findCompany?.time?.end_time
        )
      ) {
        findAttendance.out_time = out_time;

        const updatedAttendance = await findAttendance?.save();

        return res.json({ attendance: updatedAttendance });
      }
    } else {
      findAttendance.out_time = out_time;

      const updatedAttendance = await findAttendance?.save();

      return res.json({ attendance: updatedAttendance });
    }
  } catch (error) {
    next(error);
  }
};

// fetch Monthly Attendance
// get method | api/attendances/monthly/:company_id/:attendance_date
const fetchMonthlyAttendance = async (req, res, next) => {
  try {
    const { company_id, attendance_date } = req.params;

    if (!company_id && !attendance_date)
      return res
        .status(400)
        .json({ err: 'company id and attendance date should be provided' });

    const month = validateAttendanceDate(attendance_date);

    const attendances = await Attendances.find({
      company_id,
      attendance_date: { $regex: attendance_date, $options: 'i' },
    });

    if (!attendances?.length > 0) {
      return res.json({
        err: 'cannot find attendance with company_id ',
        company_id,
      });
    }

    const ids = attendances.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    return res.json({ attendances, users, month });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createDailyAttendance,
  fetchDailyAttendance,
  fetchMonthlyAttendance,
  fetchSummaryAttendance,
  outTimeDailyAttendance,
  updateDailyAttendance,
};
