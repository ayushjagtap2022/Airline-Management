const { StatusCodes } = require('http-status-codes')
const { BookingService } = require('../services')
const { messageQueue } = require('../utils')
const { serverConfig } = require('../config')
const bookingService = new BookingService()
class BookingController {
    constructor() {
        // this.channel = channel
    }
    async sendMessageToQueue(req, res) {
        const channel = await messageQueue.createChannel();
        const payload = {
            data: {
                service: 'CREATE_TICKET',
                subject: "This is notification from queue",
                content: "Some queue will subscribe this",
                recepientEmail: "kavitajagtap70458@gmail.com",
                notificationTime: "2024-06-11"
            }
        }
        messageQueue.publishMessage(channel, serverConfig.REMINDER_BINDING_KEY, JSON.stringify(payload.data))
        return res.status(200).json({
            message: 'Successfuly published the event'
        })
    }
    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body)
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            throw res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explaination,
                data: {}
            })
        }
    }
}
module.exports = BookingController;