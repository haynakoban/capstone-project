const express = require('express');
const router = express.Router();
const { tasksController } = require('../controllers');

const { upload } = require('../config/conn');
const auth = require('../middlewares/auth_user_cookie');

// post method -- create new task
router
  .route('/')
  .post(upload.array('ref_files', 6), tasksController.createNewTask);

// post method -- submit task
router
  .route('/submit')
  .post(upload.array('ref_files', 6), tasksController.submitTask);

// get method - fetch all tasks
// put method - update task
// delete method - delete task
router
  .route('/:id')
  .get(auth, tasksController.fetchTasks)
  .put(auth, tasksController.updateTask)
  .delete(auth, tasksController.deleteTask);

// delete method - undo a task and delete files
router.route('/:id/:user_id').delete(auth, tasksController.undoSubmitTask);

// get method - fetch all submitted files
router.route('/:id/:company_id').get(auth, tasksController.fetchSubmittedTasks);

// get method - fetch single task
router
  .route('/:company_id/:user_id/:id')
  .get(auth, tasksController.selectTaskById);

module.exports = router;
