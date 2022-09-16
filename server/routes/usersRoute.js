const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

router
  .route('/')
  //   .get(usersController.getAllUsers)
  .post(auth, usersController.createNewUser);

// username validation
router
  .route('/validation')
  .get(auth, usersController.userLogout)
  .post(usersController.isUsernameValid);

// get -- validate if the user is logged in
// post -- logged in the user
router
  .route('/auth')
  .get(auth, usersController.isUserLoggedIn)
  .post(auth, usersController.userLogin);

// get -- get the user information
// put -- update the user profile information
router
  .route('/auth/:id')
  .get(auth, usersController.getUserInfo)
  .put(auth, usersController.updateUserProfileInfo);

module.exports = router;
