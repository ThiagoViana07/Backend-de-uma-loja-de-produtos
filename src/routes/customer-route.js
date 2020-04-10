const express = require('express');
const router = express.Router();
const controller = require('../controller/customerController');

router.post('/',controller.post);

module.exports = router

