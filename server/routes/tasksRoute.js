const express = require('express');
const router = express.Router();
const { tasksController } = require('../controllers');

const { upload } = require('../config/conn');
const auth = require('../middlewares/auth_user_cookie');

// post method -- create new task
router
  .route('/')
  .post(upload.array('ref_files', 6), tasksController.createNewTask);

// get method - fetch all tasks
router.route('/:id').get(auth, tasksController.fetchTasks);
// .put(auth, postsController.updatePost)
// .delete(auth, postsController.deletePost);

module.exports = router;
