const express = require('express');
const router = express.Router();
const { companiesController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// get method -- retrieve rooms
// post method -- create / register a new room
router
  .route('/')
  .get(auth, companiesController.getRooms)
  .post(auth, companiesController.createRoom);

// get method -- retrieve the company/room information
// post method -- join to a room
router
  .route('/validate')
  .get(companiesController.getRoomInfo)
  .post(companiesController.joinRoom);

// get method -- retrieve all my room
router.route('/:id').get(companiesController.getMyRoom);

module.exports = router;
