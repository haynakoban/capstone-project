const Comments = require('./comments/commentsModel');
const Companies = require('./companies/companiesModel');
const Notifications = require('./notifications/notificationsModel');
const Posts = require('./posts/postsModel');
const Tasks = require('./tasks/tasksModel');
const TasksSubmitted = require('./tasks/submittedTaskModel');
const Users = require('./users/usersModel');

module.exports = {
  Comments,
  Companies,
  Notifications,
  Posts,
  Tasks,
  TasksSubmitted,
  Users,
};
