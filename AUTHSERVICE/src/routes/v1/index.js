const express = require('express')
const Router = express.Router()
const userRouter = require('./user-routes')
Router.use('/users', userRouter)
module.exports = Router
