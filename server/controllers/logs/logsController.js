const { Logs, Users } = require('../../models');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const ipInfo = require('ipinfo');

// create log report
// post method | api/logs
const createLog = async (req, res, next) => {
  try {
    const { user_id, report_date, time, user_type, log } = req.body;

    // // if one is empty or missing the result return false, otherwise true.
    const canSave = [user_id, report_date, time, user_type, log].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    ipInfo((err, cLoc) => {
      if (err) return res.json({ err: 'cannot track ip address' });

      Logs.create({
        user_id: ObjectId(user_id),
        report_date,
        time,
        user_type,
        log,
        ip_address: cLoc?.ip,
      })
        .then((resolve) => {
          return res.json({ msg: 'success', log: resolve });
        })
        .catch((err) => {
          return res.json({ err });
        });
    });
  } catch (error) {
    next(error);
  }
};

// get log reports
// get method | api/logs/:date
const getLogReports = async (req, res, next) => {
  try {
    const { date } = req.params;

    if (!date) return res.json({ err: 'date field must have value' });

    const findLogs = await Logs.find({ report_date: date }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (findLogs?.length > 0) {
      const ids = findLogs?.map((e) => e?.user_id);

      if (!ids) return res.json({ err: 'no ids' });

      const users = await Users.find({ _id: { $in: ids } });

      if (users?.length > 0) {
        return res.json({ users, logs: findLogs });
      }

      return res.json({ err: 'no users' });
    }

    return res.json({ msg: 'No results matched your search.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLog,
  getLogReports,
};
