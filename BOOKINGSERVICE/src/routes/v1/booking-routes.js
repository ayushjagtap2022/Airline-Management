const express = require('express')
const Router = express.Router()
const { BookingController } = require('../../controllers')

const bookingController = new BookingController()
Router.post('/', bookingController.create)
Router.get('/', (req, res) => {
    return res.json({
        seccess: true,
        message: "hii info"
    })
})
Router.post('/publish', bookingController.sendMessageToQueue)
module.exports = Router