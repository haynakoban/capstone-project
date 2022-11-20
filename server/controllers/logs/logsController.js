const { Logs, Users } = require('../../models');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const ipInfo = require('ipinfo');

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

module.exports = {
  createLog,
};
