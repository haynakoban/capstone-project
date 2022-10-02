const express = require('express');
const router = express.Router();
const { tasksController } = require('../controllers');

const { upload } = require('../config/conn');
const auth = require('../middlewares/auth_user_cookie');

// post method -- create new post
router
  .route('/')
  .post(upload.array('ref_files', 6), tasksController.createNewTask);

module.exports = router;
