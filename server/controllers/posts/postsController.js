const { Comments, Posts, Users } = require('../../models');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const DB_URL = process.env.MONGO_URL;

const conn = mongoose.createConnection(DB_URL);

// create new post
// post method | /api/posts
const createNewPost = async (req, res, next) => {
  try {
    const { text, user_id, company_id } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [user_id, company_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const post = await Posts.create({
      text,
      file_id: req.file?.id,
      user_id,
      company_id,
    });

    if (!post) return res.json({ err: 'cannot create the post' });

    const users = await Users.find({ _id: user_id }, 'name').exec();

    if (!users) return res.json({ err: `no users found` });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const cursor = bucket.find(ObjectId(post?.file_id));
    const file = await cursor.toArray();

    if (file.length > 0) {
      return res.json({ post, user: users, filename: file?.[0]?.filename });
    }

    return res.status(201).json({ post, user: users });
  } catch (e) {
    next(e);
  }
};

// fetch all posts
// get method | /api/posts/:id
const fetchPosts = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ err: 'company id should be provided' });

    const posts = await Posts.find({ company_id: id }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!posts) return res.json({ err: 'no data found' });

    const ids = posts.map((e) => e.user_id);
    const file_lists = posts.filter((e) => e.file_id !== undefined);
    const file_ids = file_lists.map((e) => e.file_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    if (!users) return res.json({ err: `no users found` });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const cursor = bucket.find({ _id: { $in: file_ids } });
    const files = await cursor.toArray();

    if (files.length > 0) {
      return res.json({ posts, users, files });
    }

    return res.json({ posts, users });
  } catch (e) {
    next(e);
  }
};

// fetch latest post
// get method | /api/posts/latest/:id
const fetchLatestPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ err: 'company id should be provided' });

    const post = await Posts.find({ company_id: id }).limit(1).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!post) return res.json({ err: 'no data found' });

    const user = await Users.find({ _id: post?.[0]?.user_id }, 'name').exec();

    if (!user) return res.json({ err: `no users found` });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const cursor = bucket.find(ObjectId(post?.[0]?.file_id));
    const file = await cursor.toArray();

    if (file.length > 0) {
      return res.json({ post, user, filename: file?.[0]?.filename });
    }

    return res.json({ post, user });
  } catch (e) {
    next(e);
  }
};

// fetch single post
// get method | /api/posts/:company_id/:id
const selectPostById = async (req, res, next) => {
  try {
    const { company_id, id } = req.params;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [company_id, id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const post = await Posts.findOne({ $and: [{ _id: id }, { company_id }] });

    if (!post) return res.json({ err: 'no data found' });

    const user = await Users.find({ _id: post.user_id }, 'name').exec();

    if (!user) return res.json({ err: `no users found` });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const cursor = bucket.find(ObjectId(post?.file_id));
    const file = await cursor.toArray();

    if (file.length > 0) {
      return res.json({ post, user, filename: file?.[0]?.filename });
    }

    return res.json({ post, user });
  } catch (e) {
    next(e);
  }
};

// update the post
// put method | /api/posts/:id
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const date = new Date();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [text, id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findPost = await Posts.findById(id).exec();

    if (!findPost) return res.json({ err: `no data found with the id: ${id}` });

    const users = await Users.find({ _id: findPost?.user_id }, 'name').exec();

    if (!users) return res.json({ err: `no users found` });

    findPost.text = text;
    findPost.updatedAt = date;

    const updatedPost = await findPost.save();

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const cursor = bucket.find(ObjectId(updatedPost?.file_id));
    const file = await cursor.toArray();

    if (file.length > 0) {
      return res.json({
        post: updatedPost,
        user: users,
        filename: file?.[0]?.filename,
      });
    }

    return res.json({ post: updatedPost, user: users });
  } catch (error) {
    next(error);
  }
};

// delete the post
// delete method | /api/posts/:id
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findPost = await Posts.findByIdAndDelete(id).exec();

    if (!findPost) return res.json({ err: `no data found with the id: ${id}` });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    if (findPost?.file_id) {
      await bucket.delete(ObjectId(findPost?.file_id));
    }

    await Comments.deleteMany({ post_id: findPost._id });

    return res.json({ msg: 'success', id: findPost?._id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewPost,
  deletePost,
  fetchLatestPost,
  fetchPosts,
  selectPostById,
  updatePost,
};
