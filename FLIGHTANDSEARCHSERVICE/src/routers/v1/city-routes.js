const express = require('express')
const Router = express.Router();
const { cityController } = require('../../controllers')
Router.post('/', cityController.create)
Router.get('/search', cityController.searchCity)
Router.delete('/:id', cityController.destroy)
Router.get('/:id', cityController.get)
Router.get('/', cityController.getAll)
Router.patch('/:id', cityController.update)
module.exports = Router