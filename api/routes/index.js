const express = require('express');

const router = new express.Router();

const temperatureController = require('../controllers/temperature-controller');


router.route('/temperature').get(temperatureController.getAll);

module.exports = router;