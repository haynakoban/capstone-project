const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

router
  .route('/')
  //   .get(usersController.getAllUsers)
  .post(usersController.createNewUser);

// username validation
router.post('/auth', usersController.isUsernameValid);

// user log in validation
router.post('/auth/_log', usersController.userLogin);

// router
//   .route('/:id')
//   .get(postsController.selectPostById)
//   .put(postsController.updatePost)
//   .delete(postsController.deletePost);

module.exports = router;
