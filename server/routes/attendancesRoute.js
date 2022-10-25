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

// get method - fetch summary attendance
router.route('/:id').get(attendancesController.fetchSummaryAttendance);

// get method - fetch daily attendance
router
  .route('/:id/:attendance_date')
  .get(attendancesController.fetchDailyAttendance);

module.exports = router;
