const express = require('express')
const Router = express.Router();
const { airportController } = require('../../controllers')
Router.post('/', airportController.create)

module.exports = Router