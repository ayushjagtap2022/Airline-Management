const express = require('express')
const Router = express.Router()
const { userController } = require('../../controllers')
const { AuthRequestValidatorMiddleware } = require('../../middlewares')
Router.post('/signup', AuthRequestValidatorMiddleware.validateUserAuth, userController.create)
Router.post('/signin', AuthRequestValidatorMiddleware.validateUserAuth, userController.signIn)
Router.get('/isAuthenticated', userController.isAuthenticated)
Router.get('/isAdmin', AuthRequestValidatorMiddleware.validateIsAdminRequest, userController.isAdmin)
module.exports = Router
