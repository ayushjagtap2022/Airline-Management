const express = require('express');
const Router = express.Router();
const ticketRoutes = require('./ticket-routes')
Router.use('/tickets', ticketRoutes);
module.exports = Router;
