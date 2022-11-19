const express = require('express');
const router = express.Router();
const { logsController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method -- add report
router.route('/').post(auth, logsController.createDailyReport);

// get method -- fetch report
router.route('/').get(auth, logsController.fetchDailyReport);

module.exports = router;
