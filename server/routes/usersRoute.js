const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

router
  .route('/')
  //   .get(usersController.getAllUsers)
  .post(auth, usersController.createNewUser);

// username validation
router.post('/validation', usersController.isUsernameValid);

// user log in validation
router
  .route('/auth')
  .get(auth, usersController.isUserLoggedIn)
  .post(auth, usersController.userLogin);

module.exports = router;
