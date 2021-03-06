const express = require('express');

const router = new express.Router();

const temperatureController = require('../controllers/temperature-controller');


router.route('/temperature').get(temperatureController.getAll);
router.route('/temperature/last').get(temperatureController.getLatest);
router.route('/temperature/latest').get(temperatureController.getTemperatureChartData);


module.exports = router;