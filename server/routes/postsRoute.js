const express = require('express');
const router = express.Router();
const { postsController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method -- create new post
router.route('/').post(auth, postsController.createNewPost);

// get method - fetch all posts
// put method - update post
// delete method - delete post
router
  .route('/:id')
  .get(auth, postsController.fetchPosts)
  .put(auth, postsController.updatePost)
  .delete(auth, postsController.deletePost);

// get method - fetch single post
router.route('/:company_id/:id').get(auth, postsController.selectPostById);

module.exports = router;
