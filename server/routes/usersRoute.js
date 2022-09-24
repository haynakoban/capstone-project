const express = require('express');
const { upload, delete_file } = require('../config/conn');
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

// post -- apply for internship
// put -- update the user documents under the resume settings
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

router.route('/files/:id').delete(delete_file);

module.exports = router;
