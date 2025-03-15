const express = require('express')
const Router = express.Router();
const Bookings = require('./booking-routes')
Router.use('/bookings', Bookings)
module.exports = Router