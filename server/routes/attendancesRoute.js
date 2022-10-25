const express = require('express');
const router = express.Router();
const { attendancesController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method - create daily attendance
router.route('/').post(auth, attendancesController.createDailyAttendance);

// get method - fetch daily attendance
router
  .route('/:id/:attendance_date')
  .get(attendancesController.fetchDailyAttendance);

module.exports = router;
