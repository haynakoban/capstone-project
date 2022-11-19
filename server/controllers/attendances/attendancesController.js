const { Attendances, Users, Companies } = require('../../models');
const ObjectId = require('mongodb').ObjectId;
const {
  formatDistance,
  isStartAndEndTime,
} = require('../../lib/dateFormatter');

// validate attendance date
const validateAttendanceDate = (date) => {
  switch (date?.slice(0, 2)) {
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

// generate attendance
// post method | api/attendances/gen
const generateAttendances = async (req, res, next) => {
  try {
    const { users, company_id, attendance_date } = req.body;

    if (!company_id && !attendance_date)
      return res.json({ err: 'required field must be filled' });

    if (users?.length === 0) {
      return res.json({ err: 'no users' });
    } else if (users?.length === 1) {
      // insert 1
      const createAttendance = await Attendances.create({
        attendance_date,
        status: 'Absent',
        user_id: ObjectId(users?.[0]?._id),
        company_id: ObjectId(company_id),
      });

      const findUser = await Users?.findById({ _id: users?.[0]?._id }, 'name');

      if (!findUser) {
        return res.json({ err: 'no users found' });
      }

      return res.json({ attendance: createAttendance, user: findUser });
    } else {
      const getIds = users?.map((e) => e?._id);

      const newUsers = getIds?.map((e) => {
        const user = {
          attendance_date,
          status: 'Absent',
          user_id: ObjectId(e),
          company_id: ObjectId(company_id),
        };

        return user;
      });

      // intern many
      const createAttendance = await Attendances?.insertMany(newUsers);

      const findUsers = await Users?.find({ _id: { $in: getIds } }, 'name');

      if (findUsers?.length === 0) {
        return res.json({ err: 'no users found' });
      }

      return res.json({ attendances: createAttendance, users: findUsers });
    }
  } catch (error) {
    next(error);
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

    const findAttendance = await Attendances.findOne({
      attendance_date,
      user_id,
    });

    if (findAttendance) {
      if (findCompany?.time?.isOn) {
        // check if the in time is after the start time of the company settings
        if (
          isStartAndEndTime(
            findCompany?.time?.start_time,
            in_time,
            findCompany?.time?.end_time
          )
        ) {
          if (findAttendance?.in_time === undefined) {
            findAttendance.in_time = in_time;
            findAttendance.status = status;

            const updatedAttendance = await findAttendance.save();

            return res.json({
              createAttendance: updatedAttendance,
            });
          } else {
            return res.json({
              createAttendance: findAttendance,
            });
          }
        }
      } else {
        if (findAttendance?.in_time === undefined) {
          findAttendance.in_time = in_time;
          findAttendance.status = status;

          const updatedAttendance = await findAttendance.save();

          return res.json({ createAttendance: updatedAttendance });
        } else {
          return res.json({
            createAttendance: findAttendance,
          });
        }
      }
    } else {
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

        findAttendance.total_hours = formatDistance(
          findAttendance.in_time,
          out_time
        );

        const updatedAttendance = await findAttendance?.save();

        return res.json({ attendance: updatedAttendance });
      }
    } else {
      findAttendance.out_time = out_time;
      findAttendance.total_hours = formatDistance(
        findAttendance.in_time,
        out_time
      );

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

    const startsWith = attendance_date?.slice(0, 2);
    const endsWith = attendance_date?.slice(-4);

    if (!company_id && !attendance_date)
      return res
        .status(400)
        .json({ err: 'company id and attendance date should be provided' });

    const month = validateAttendanceDate(attendance_date);

    const attendances = await Attendances.find({
      $and: [
        { company_id },
        {
          $and: [
            {
              attendance_date: { $regex: `^${startsWith}`, $options: 'm' },
            },
            {
              attendance_date: { $regex: `${endsWith}$`, $options: 'm' },
            },
          ],
        },
      ],
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

// fetch My Summary Attendance
// get method | api/attendances/summary/:id/:user_id
const fetchMySummaryAttendance = async (req, res, next) => {
  try {
    const { id, user_id } = req.params;

    if (!id && !user_id)
      return res
        .status(400)
        .json({ err: 'company id and user id should be provided' });

    const attendances = await Attendances.find({
      $and: [{ company_id: id }, { user_id }],
    });

    const user = await Users.findById({ _id: user_id }, 'name').exec();

    if (!user) return res.json({ err: 'cannot find user: ', user_id });

    if (attendances?.length > 0) {
      return res.json({ attendances, user });
    }

    return res.json({ msg: "you don't attendance yet!" });
  } catch (e) {
    next(e);
  }
};

// fetch My Daily Attendance
// get method | api/attendances/daily/:company_id/:attendance_date/:user_id
const fetchMyDailyAttendance = async (req, res, next) => {
  try {
    const { company_id, attendance_date, user_id } = req.params;

    if (!company_id && !attendance_date && !user_id)
      return res
        .status(400)
        .json({ err: 'company id and attendance date should be provided' });

    const attendances = await Attendances.find({
      $and: [{ company_id }, { attendance_date }, { user_id }],
    });

    const user = await Users.findById({ _id: user_id }, 'name').exec();

    if (!user) return res.json({ err: 'cannot find user: ', user_id });

    if (attendances?.length > 0) {
      return res.json({ attendances, user });
    }

    return res.json({ err: 'cannot find daily attendance' });
  } catch (e) {
    next(e);
  }
};

// fetch My Monthly Attendance
// get method | api/attendances/monthly/:company_id/:attendance_date/:user_id
const fetchMyMonthlyAttendance = async (req, res, next) => {
  try {
    const { company_id, attendance_date, user_id } = req.params;

    const startsWith = attendance_date?.slice(0, 2);
    const endsWith = attendance_date?.slice(-4);

    if (!company_id && !attendance_date && !user_id)
      return res
        .status(400)
        .json({ err: 'company id and attendance date should be provided' });

    const month = validateAttendanceDate(attendance_date);

    const attendances = await Attendances.find({
      $and: [
        { company_id },
        { user_id },
        {
          $and: [
            {
              attendance_date: { $regex: `^${startsWith}`, $options: 'm' },
            },
            {
              attendance_date: { $regex: `${endsWith}$`, $options: 'm' },
            },
          ],
        },
      ],
    });

    const user = await Users.findById({ _id: user_id }, 'name').exec();

    if (!user) return res.json({ err: 'cannot find user: ', user_id });

    if (!attendances?.length > 0) {
      return res.json({
        err: 'cannot find attendance with company_id ',
        company_id,
      });
    }

    return res.json({ attendances, user, month });
  } catch (e) {
    next(e);
  }
};

// fetch all daily attendance
// get method | api/attendances/admin/d/:attendance_date
const fetchAllDailyAttendance = async (req, res, next) => {
  try {
    const { attendance_date } = req.params;

    if (!attendance_date)
      return res
        .status(400)
        .json({ err: 'company id and attendance date should be provided' });

    const attendances = await Attendances.find({
      attendance_date,
    });

    if (attendances?.length > 0) {
      const ids = attendances.map((e) => e.user_id);

      const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

      return res.json({ attendances, users });
    }

    return res.json({ err: 'cannot find attendance today' });
  } catch (e) {
    next(e);
  }
};

// fetch all monthly attendance
// get method | api/attendances/admin/m/:attendance_date
const fetchAllMonthlyAttendance = async (req, res, next) => {
  try {
    const { attendance_date } = req.params;

    const startsWith = attendance_date?.slice(0, 2);
    const endsWith = attendance_date?.slice(-4);

    if (!attendance_date)
      return res
        .status(400)
        .json({ err: 'company id and attendance date should be provided' });

    const month = validateAttendanceDate(attendance_date);

    const attendances = await Attendances.find({
      $and: [
        {
          attendance_date: { $regex: `^${startsWith}`, $options: 'm' },
        },
        {
          attendance_date: { $regex: `${endsWith}$`, $options: 'm' },
        },
      ],
    });

    if (!attendances?.length > 0) {
      return res.json({
        err: 'cannot find monthly attendance',
      });
    }

    const ids = attendances.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    return res.json({ attendances, users, month });
  } catch (e) {
    next(e);
  }
};

// fetch all summary attendance
// get method | api/attendances/gen
const fetchAllSummaryAttendance = async (req, res, next) => {
  try {
    const attendances = await Attendances.find();

    if (!attendances?.length > 0)
      return res.json({ err: 'cannot find summary attendance ' });

    const ids = attendances.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    return res.json({ attendances, users });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createDailyAttendance,
  fetchAllDailyAttendance,
  fetchAllMonthlyAttendance,
  fetchAllSummaryAttendance,
  fetchDailyAttendance,
  fetchMonthlyAttendance,
  fetchMyDailyAttendance,
  fetchMyMonthlyAttendance,
  fetchMySummaryAttendance,
  fetchSummaryAttendance,
  generateAttendances,
  outTimeDailyAttendance,
  updateDailyAttendance,
};
