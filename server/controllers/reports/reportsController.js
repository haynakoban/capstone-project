const { Reports, Users } = require('../../models');
const ip = require('ip');

// fetch daily log reports
// get method | api/reports/:report_date
const fetchDailyReport = async (req, res, next) => {
  try {
    const { report_date } = req.params;

    if (!report_date)
      return res
        .status(400)
        .json({ err: 'log report date should be provided' });

    const reports = await Reports.find({ report_date });

    if (!reports)
      return res.json({ err: 'cannot find log reports at ', report_date });

    const ids = reports.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    return res.json({ reports, users });
  } catch (e) {
    next(e);
  }
};

// create new report
// post method | /api/reports
const createDailyReport = async (req, res, next) => {
  try {
    const { user_id, report_date, time, user_type, log } = req.body;
    const ip_address = ip.address();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [
      user_id,
      report_date,
      time,
      user_type,
      log,
      ip_address,
    ].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const report = await Reports.create({
      user_id,
      report_date,
      time,
      user_type,
      log,
      ip_address,
    });

    const users = await Users.find({ _id: user_id }, 'name').exec();

    if (!users) return res.json({ err: `no users found` });

    return res.status(201).json({ report, user: users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDailyReport,
  fetchDailyReport,
};
