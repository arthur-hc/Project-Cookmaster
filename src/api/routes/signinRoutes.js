const express = require('express');
const usersController = require('../../controllers/usersController');

const router = express.Router();

router.post('/', usersController.signin);

module.exports = router;
