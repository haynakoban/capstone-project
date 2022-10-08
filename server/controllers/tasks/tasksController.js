const { Tasks, TasksSubmitted, Users } = require('../../models');
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

// fetch single task
// get method | /api/tasks/:company_id/:user_id/:id
const selectTaskById = async (req, res, next) => {
  try {
    const { company_id, user_id, id } = req.params;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [company_id, id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const task = await Tasks.findOne({ $and: [{ _id: id }, { company_id }] });

    if (!task) return res.json({ err: 'no data found' });

    const user = await Users.find({ _id: task.createdBy }, 'name').exec();

    if (!user) return res.json({ err: `no users found` });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    // look for file first
    if (task.ref_files.length > 0) {
      file_id = task.ref_files.map((f) => ObjectId(f));
      const cursor = bucket.find({ _id: { $in: file_id } });
      const files = await cursor.toArray();

      if (task.submitted_by.length > 0) {
        const find_user = task.submitted_by.filter((e) => e.user_id == user_id);

        if (find_user.length === 0)
          return res.json({ task, user, files, s_task: false });

        const find_sub_files = await TasksSubmitted.findById({
          _id: find_user?.[0]?.submitted_task_id,
        });

        if (!find_sub_files)
          return res.json({ task, user, files, s_task: false });

        const sub_file_id = find_sub_files.files.map((f) => ObjectId(f));
        const cursor = bucket.find({ _id: { $in: sub_file_id } });
        const sub_files = await cursor.toArray();

        return res.json({
          task,
          user,
          files,
          s_task: true,
          s_files: sub_files,
          submitted_on: find_user?.[0]?.updatedAt,
        });
      }

      return res.json({ task, user, files, s_task: false });
    }

    // look for user who submit
    if (task.submitted_by.length > 0) {
      const find_user = task.submitted_by.filter((e) => e.user_id == user_id);

      if (find_user.length === 0)
        return res.json({ task, user, s_task: false });

      const find_sub_files = await TasksSubmitted.findById({
        _id: find_user?.[0]?.submitted_task_id,
      });

      if (!find_sub_files) return res.json({ task, user, s_task: false });

      const sub_file_id = find_sub_files.files.map((f) => ObjectId(f));
      const cursor = bucket.find({ _id: { $in: sub_file_id } });
      const sub_files = await cursor.toArray();

      return res.json({
        task,
        user,
        s_task: true,
        s_files: sub_files,
        submitted_on: find_user?.[0]?.updatedAt,
      });
    }

    return res.json({ task, user, s_task: false });
  } catch (e) {
    next(e);
  }
};

// submit a task
// post method | api/tasks/submit
const submitTask = async (req, res, next) => {
  try {
    const { id, user_id } = req.body;
    const date = new Date();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id, user_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const task = await Tasks.findOne({ _id: id });

    if (!task) return res.json({ err: 'no data found' });

    const user = await Users.findOne({ _id: user_id }, 'name');

    if (!user) return res.json({ err: `no users found` });

    let file_id = [];
    let file_name = [];
    if (req.files) {
      const list_of_files = Array.from(req.files);

      for (const file of list_of_files) {
        file_id.push(file.id);
        file_name.push(file.filename);
      }
    }

    const submitted_task = await TasksSubmitted.create({
      files: file_id,
    });

    if (!submitted_task) return res.json({ err: `cannot submit your query` });

    task.submitted_by?.push({
      user_id: user._id,
      submitted_task_id: submitted_task._id,
      createdAt: date,
      updatedAt: date,
    });

    const updatedTask = await task.save();

    return res.json({
      s_task: true,
      task: updatedTask,
      filename: file_name,
      msg: 'success',
      submitted_on: date,
    });
  } catch (error) {
    next(error);
  }
};

// undo a task + delete files
// delete method | api/tasks/:id/:user_id
const undoSubmitTask = async (req, res, next) => {
  try {
    const { id, user_id } = req.params;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id, user_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findTask = await Tasks.findById(id).exec();

    if (!findTask) return res.json({ err: `no data found with the id: ${id}` });

    const find_user = findTask.submitted_by.filter((e) => e.user_id == user_id);
    const saved_user = findTask.submitted_by.filter(
      (e) => e.user_id != user_id
    );

    findTask.submitted_by = saved_user;
    findTask.save();

    const find_file = await TasksSubmitted.findByIdAndDelete({
      _id: find_user?.[0]?.submitted_task_id,
    });

    if (!find_file)
      return res.json({ err: `no data found with the id: ${id}` });

    if (find_file?.files?.length > 0) {
      const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
      });

      file_id = find_file?.files.map((f) => f);

      for (const file of file_id) {
        await bucket.delete(file._id);
      }

      return res.json({ s_task: false, file_deleted: file_id?.length });
    }

    return res.json({ s_task: false });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewTask,
  fetchTasks,
  selectTaskById,
  submitTask,
  undoSubmitTask,
};
