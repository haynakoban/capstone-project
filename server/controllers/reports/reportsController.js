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

module.exports = {
  createNewReport,
  fetchDailyReport,
};
