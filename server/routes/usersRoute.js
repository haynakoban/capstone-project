const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

router
  .route('/')
  //   .get(usersController.getAllUsers)
  .post(auth, usersController.createNewUser);

// username validation
router.post('/auth', usersController.isUsernameValid);

// user log in validation
router.post('/auth/_log', auth, usersController.userLogin);

// router
//   .route('/:id')
//   .get(postsController.selectPostById)
//   .put(postsController.updatePost)
//   .delete(postsController.deletePost);

module.exports = router;
