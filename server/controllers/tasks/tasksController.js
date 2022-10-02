const { Tasks, Users } = require('../../models');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/main-sys';

const conn = mongoose.createConnection(DB_URL);

// create new post
// post method | /api/tasks
const createNewTask = async (req, res, next) => {
  try {
    const { title, description, createdBy, company_id, dueDate, closesDate } =
      req.body;

    // // if one is empty or missing the result return false, otherwise true.
    const canSave = [title, createdBy, company_id, dueDate, closesDate].every(
      Boolean
    );

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    let file_id = [];
    if (req.files) {
      const list_of_files = Array.from(req.files);

      for (const file of list_of_files) {
        file_id.push(file.id);
      }
    }

    const task = await Tasks.create({
      title,
      description,
      ref_files: file_id,
      assignedTo: req.body?.assignedTo,
      createdBy,
      company_id,
      date: {
        due: dueDate,
        closes: closesDate,
      },
    });

    if (!task) return res.json({ err: 'cannot create the task' });

    const user = await Users.find({ _id: createdBy }, 'name').exec();

    if (!user) return res.json({ err: `no users found` });

    // const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    //   bucketName: 'uploads',
    // });

    // const cursor = bucket.find(ObjectId(task?.ref_files));
    // const file = await cursor.toArray();

    // if (file.length > 0) {
    //   return res.json({ post, user, filename: file?.[0]?.filename });
    // }

    return res.status(201).json({ task, user });
  } catch (e) {
    next(e);
  }
};

// fetch all posts
// get method | /api/tasks/:id
const fetchTasks = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ err: 'company id should be provided' });

    const tasks = await Tasks.find({ company_id: id }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!tasks) return res.json({ err: 'no data found' });

    const ids = tasks.map((e) => e.createdBy);

    // const file_lists = tasks.filter((e) => e.ref_files !== undefined);
    // const file_ids = file_lists.map((e) => e.file_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    if (!users) return res.json({ err: `no users found` });

    // const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    //   bucketName: 'uploads',
    // });

    // const cursor = bucket.find({ _id: { $in: file_ids } });
    // const files = await cursor.toArray();

    // if (files.length > 0) {
    //   return res.json({ posts, users, files });
    // }

    return res.json({ tasks, users });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createNewTask,
  fetchTasks,
};
