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

// get method -- get the room info
// put method -- set the start and end time
router
  .route('/auth/:id')
  .get(companiesController.getRoomInfo)
  .put(companiesController.toogleStartAndEndTime);

// get method -- retrieve all my room
// put method -- add company description
router
  .route('/:id')
  .get(companiesController.getMyRoom)
  .put(auth, companiesController.addDescription);

// put method -- accept intern request
// delete method -- decline intern request
router
  .route('/:id/:user_id')
  .put(auth, companiesController.acceptIntern)
  .delete(auth, companiesController.declineInternRequest);

module.exports = router;
