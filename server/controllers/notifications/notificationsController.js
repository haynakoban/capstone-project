const { Notifications, Users, Tasks } = require('../../models');

// fetch all notifications
// get method | api/notifications/:id
const fetchNotifications = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ err: 'post id should be provided' });

    const notifs = await Notifications.find(
      {
        'recipient.recipient_id': id,
      },
      '-recipient'
    ).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!notifs) return res.json({ err: 'no data found' });

    const list_of_notifs = await Notifications.find(
      {
        'recipient.recipient_id': id,
      },
      'recipient'
    ).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!list_of_notifs) return res.json({ err: 'no data found' });

    const ids = notifs.map((e) => e.createdBy);
    const task_ids = notifs.map((e) => e.task_id);

    const simplifyArray = (arr = []) => {
      const res = [];
      arr.forEach((element) => {
        element?.recipient.forEach((el) => {
          if (el?.recipient_id === id && !el?.is_read) {
            res.push({
              _id: element?._id,
              recipient_id: el?.recipient_id,
              is_read: el?.is_read,
            });
          }
        });
      });
      return res;
    };

    const notif_ids = simplifyArray(list_of_notifs);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();
    if (!users) return res.json({ err: `no users found` });

    const tasks = await Tasks.find({ _id: { $in: task_ids } }, 'title').exec();
    if (!tasks) return res.json({ err: `no tasks found` });

    return res.json({ notifs, users, tasks, notif_ids });
  } catch (e) {
    next(e);
  }
};

// read notification
// put method | api/notifications/:id
const readNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const date = new Date();

    if (!id) return res.status(400).json({ err: 'post id should be provided' });

    const notif = await Notifications.findById(id).exec();

    if (notif?.recipient?.length > 0) {
      const edit_user = notif?.recipient?.filter(
        (n) => n?.recipient_id === user_id
      );

      edit_user[0].is_read = true;

      const pop_user = notif?.recipient?.filter(
        (n) => n?.recipient_id !== user_id
      );

      notif.recipient = pop_user;
      notif.recipient?.unshift(edit_user[0]);
    }

    notif.updatedAt = date;
    const updatedNotif = await notif.save();

    return res.json({ notif: updatedNotif });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  fetchNotifications,
  readNotification,
};
