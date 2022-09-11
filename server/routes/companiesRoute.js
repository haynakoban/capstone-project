const express = require('express');
const router = express.Router();
const { companiesController } = require('../controllers');

// get method -- retrieve the company/room information
// post method -- create / register a new room
router
  .route('/')
  //   .get(companiesController.getRoomInfo)
  .post(companiesController.createRoom);

// room name validation
router.route('/validate').post(companiesController.isRoomNameValid);

// get method -- retrieve the company id
// router.route('/:id').get(companiesController.getRoomId);

module.exports = router;
