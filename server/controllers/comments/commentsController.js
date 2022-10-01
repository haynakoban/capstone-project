const { Comments, Users } = require('../../models');

// add comment
// post method | /api/comments
const addComment = async (req, res, next) => {
  try {
    const { text, post_id, user_id } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [text, post_id, user_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const comment = await Comments.create({ text, post_id, user_id });

    if (!comment) return res.json({ err: 'cannot add comment to the post' });

    const user = await Users.find({ _id: user_id }, 'name').exec();

    if (!user) return res.json({ err: `no users found` });

    return res.status(201).json({ comment, user });
  } catch (e) {
    next(e);
  }
};

// fetch all comments
// get method | /api/comments/:id
const fetchComments = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ err: 'post id should be provided' });

    const comments = await Comments.find({ post_id: id }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!comments) return res.json({ err: 'no data found' });

    const ids = comments.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    if (!users) return res.json({ err: `no users found` });

    return res.json({ comments, users });
  } catch (e) {
    next(e);
  }
};

// fetch single comment
// get method | /api/comments/comment/:id
const fetchSingleComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ err: 'post id should be provided' });

    const comment = await Comments.find({ post_id: id }).limit(1).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!comment) return res.json({ err: 'no data found' });

    const user = await Users.find(
      { _id: comment?.[0]?.user_id },
      'name'
    ).exec();

    if (!user) return res.json({ err: `no users found` });

    return res.json({ comment, user });
  } catch (e) {
    next(e);
  }
};

// update a comment
// put method | api/comments/:id
const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const date = new Date();

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [text, id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findComment = await Comments.findById(id).exec();

    if (!findComment)
      return res.json({ err: `no data found with the id: ${id}` });

    const user = await Users.find({ _id: findComment?.user_id }, 'name').exec();

    if (!user) return res.json({ err: `no users found` });

    findComment.text = text;
    findComment.updatedAt = date;

    const updatedComment = await findComment.save();

    return res.json({ comment: updatedComment, user });
  } catch (error) {
    next(error);
  }
};

// delete a comment
// delete method | api/comments/:id
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const findComment = await Comments.findByIdAndDelete(id).exec();

    if (!findComment)
      return res.json({ err: `no data found with the id: ${id}` });

    return res.json({ msg: 'success', id: findComment?._id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  deleteComment,
  fetchComments,
  fetchSingleComment,
  updateComment,
};
