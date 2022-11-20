const express = require('express');
const router = express.Router();
const { logsController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method - create log report
router.route('/').post(auth, logsController.createLog);

// get method - get log reports
router.route('/:date').get(auth, logsController.createLog);

module.exports = router;
