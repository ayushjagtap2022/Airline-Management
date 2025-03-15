const express = require('express')
const Router = express.Router();
const cityRouter = require('./city-routes')
const flightRouter = require('./flight-routes')
const airportRouter = require('./airport-routes')
Router.use('/city', cityRouter)
Router.use('/flights', flightRouter)
Router.use('/airports', airportRouter)
module.exports = Router