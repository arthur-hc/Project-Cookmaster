const express = require('express');
const usersController = require('../../controllers/usersController');
const validationJWT = require('../auth/validationJWT');

const router = express.Router();

router.post('/', usersController.signin);

router.post('/admin', validationJWT, usersController.registerAdmin);

module.exports = router;
