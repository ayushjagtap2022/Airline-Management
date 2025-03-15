const express = require('express');
const Router = express.Router();
const { ticketController } = require('../../controllers')
Router.post('/', ticketController.create);
module.exports = Router;
