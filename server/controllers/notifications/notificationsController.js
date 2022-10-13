const { Notifications, Users, Tasks } = require('../../models');

// fetch all comments
// get method | /api/comments/:id
const fetchNotifications = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ err: 'post id should be provided' });

    const notifs = await Notifications.find({
      recipient: { $in: id },
    }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!notifs) return res.json({ err: 'no data found' });

    const ids = notifs.map((e) => e.createdBy);
    const task_ids = notifs.map((e) => e.task_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();
    if (!users) return res.json({ err: `no users found` });

    const tasks = await Tasks.find({ _id: { $in: task_ids } }, 'title').exec();
    if (!tasks) return res.json({ err: `no tasks found` });

    return res.json({ notifs, users, tasks });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  fetchNotifications,
};
