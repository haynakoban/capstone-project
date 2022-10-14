const express = require('express');
const router = express.Router();
const { notificationController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// get method - fetch all comments
// put method - read notification
router
  .route('/:id')
  .get(auth, notificationController.fetchNotifications)
  .put(auth, notificationController.readNotification);

module.exports = router;
