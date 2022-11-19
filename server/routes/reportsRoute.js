const express = require('express');
const router = express.Router();
const { reportsController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method -- add report
router.route('/').post(auth, reportsController.createDailyReport);

// get method -- fetch report
router.route('/').get(auth, reportsController.fetchDailyReport);

module.exports = router;
