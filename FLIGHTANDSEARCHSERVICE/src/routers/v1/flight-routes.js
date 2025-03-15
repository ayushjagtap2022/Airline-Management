const express = require('express')
const Router = express.Router();
const { flightController } = require('../../controllers');
const { flightsMiddleware } = require('../../middlewares');
Router.post('/', flightsMiddleware.validateFlights, flightController.create);
Router.get('/:id', flightController.get);
Router.get('/getall', flightController.getAllFlights);
Router.patch('/:id', flightController.update);
module.exports = Router;