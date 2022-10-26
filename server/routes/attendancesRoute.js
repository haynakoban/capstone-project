const express = require('express');
const router = express.Router();
const { attendancesController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method - create daily attendance
// put method - update daily attendance
router
  .route('/')
  .post(auth, attendancesController.createDailyAttendance)
  .put(auth, attendancesController.updateDailyAttendance);

// get method - fetch monthly attendance
router
  .route('/monthly/:company_id/:attendance_date')
  .get(auth, attendancesController.fetchMonthlyAttendance);

// get method - fetch summary attendance
// put method - on logged out, create out time on daily attendance
router
  .route('/:id')
  .get(attendancesController.fetchSummaryAttendance)
  .put(attendancesController.outTimeDailyAttendance);

// get method - fetch daily attendance
router
  .route('/:id/:attendance_date')
  .get(attendancesController.fetchDailyAttendance);

module.exports = router;
