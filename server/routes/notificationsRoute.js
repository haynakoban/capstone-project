const express = require('express');
const router = express.Router();
const { notificationController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// get method - fetch all comments
router.route('/:id').get(auth, notificationController.fetchNotifications);

module.exports = router;
