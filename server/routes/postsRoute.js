const express = require('express');
const router = express.Router();
const { postsController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method -- create new post
// get method - fetch all posts
router.route('/').post(auth, postsController.createNewPost);

// get method - fetch all posts
router.route('/:company_id').get(auth, postsController.fetchPosts);

module.exports = router;
