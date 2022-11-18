const express = require('express');
const { upload, delete_file } = require('../config/conn');
const router = express.Router();
const { usersController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// post method - create new user
router.route('/').post(auth, usersController.createNewUser);

// get method - log the user out
// post method - validate username
router
  .route('/validation')
  .get(auth, usersController.userLogout)
  .post(usersController.isUsernameValid);

// post method - change username
// put method - change account info
router
  .route('/validation/username')
  .post(usersController.changeUsername)
  .put(usersController.changeAccountInfo);

// post method - validate password
router.route('/validation/password').post(usersController.validatePassword);

// post method -- apply for internship
// put method -- update the user documents under the resume settings
router
  .route('/uploads')
  .post(upload.single('file'), usersController.uploadFile)
  .put(
    upload.fields([
      { name: 'resume', maxCount: 1 },
      { name: 'cv', maxCount: 1 },
      { name: 'letter', maxCount: 1 },
    ]),
    usersController.updateUserDocs
  );

// get method -- validate if the user is logged in
// post method -- logged in the user
router
  .route('/auth')
  .get(auth, usersController.isUserLoggedIn)
  .post(auth, usersController.userLogin);

// get method -- get the user information
// put method-- update the user profile information
router
  .route('/auth/:id')
  .get(auth, usersController.getUserInfo)
  .put(auth, usersController.updateUserProfileInfo);

// put method -- leave room
router.route('/leave/:id').put(usersController.leaveRoom);

// delete method - delete file
router.route('/files/:id').delete(delete_file);

// get method - get all users
router
  .route('/admin/:type')
  .get(auth, usersController.getUsers)
  .post(auth, usersController.searchUsers);

// put method - accept company offer
// delete method - decline company offer
router
  .route('/:user_id/:company_id')
  .put(auth, usersController.acceptCompanyOffer)
  .delete(auth, usersController.declineCompanyOffer);

module.exports = router;
