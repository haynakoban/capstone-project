const attendancesController = require('./attendances/attendancesController');
const commentsController = require('./comments/commentsController');
const companiesController = require('./companies/companiesController');
const downloadsController = require('./downloads/downloadsController');
const notificationController = require('./notifications/notificationsController');
const postsController = require('./posts/postsController');
const tasksController = require('./tasks/tasksController');
const usersController = require('./users/usersController');

module.exports = {
  attendancesController,
  commentsController,
  companiesController,
  downloadsController,
  notificationController,
  postsController,
  tasksController,
  usersController,
};
