const express = require('express');
const router = express.Router();
const { downloadsController } = require('../controllers');

const auth = require('../middlewares/auth_user_cookie');

// get method - download file
router.route('/:id').get(auth, downloadsController.downloadFile);

module.exports = router;
