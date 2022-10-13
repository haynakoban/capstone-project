const commentsController = require('./comments/commentsController');
const companiesController = require('./companies/companiesController');
const notificationController = require('./notifications/notificationsController');
const postsController = require('./posts/postsController');
const tasksController = require('./tasks/tasksController');
const usersController = require('./users/usersController');

module.exports = {
  commentsController,
  companiesController,
  notificationController,
  postsController,
  tasksController,
  usersController,
};
