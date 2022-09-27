const { Posts, Users } = require('../../models');

// create new post
// post method | /api/users
const createNewPost = async (req, res, next) => {
  try {
    const { text, user_id, company_id } = req.body;

    // if one is empty or missing the result return false, otherwise true.
    const canSave = [text, user_id, company_id].every(Boolean);

    if (!canSave)
      return res.status(400).json({ err: 'required field must be filled' });

    const post = await Posts.create({ text, user_id, company_id });

    if (!post) return res.json({ err: 'cannot create the post' });

    const users = await Users.find({ _id: user_id }, 'name').exec();

    if (!users) return res.json({ err: `no users found` });

    return res.status(201).json({ post, user: users });
  } catch (e) {
    next(e);
  }
};

// fetch all the posts
// get method | /api/users
const fetchPosts = async (req, res, next) => {
  try {
    const { company_id } = req.params;

    if (!company_id)
      return res.status(400).json({ err: 'company id should be provided' });

    const posts = await Posts.find({ company_id }).sort({
      createdAt: -1,
      updatedAt: -1,
    });

    if (!posts) return res.json({ err: 'no data found' });

    const ids = posts.map((e) => e.user_id);

    const users = await Users.find({ _id: { $in: ids } }, 'name').exec();

    if (!users) return res.json({ err: `no users found` });

    return res.json({ posts, users });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createNewPost,
  fetchPosts,
};
