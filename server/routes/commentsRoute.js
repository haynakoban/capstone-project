const express = require('express');
const router = express.Router();
const { commentsController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method -- add comment
router.route('/').post(auth, commentsController.addComment);

// get method - fetch all comments
router.route('/:id').get(auth, commentsController.fetchComments);

// get method - fetch single comment
router.route('/comment/:id').get(auth, commentsController.fetchSingleComment);

module.exports = router;
