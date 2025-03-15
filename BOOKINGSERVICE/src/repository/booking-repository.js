const { StatusCodes } = require('http-status-codes')
const { Booking } = require('../models');
const { Errors } = require('../utils');
class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new Errors.ValidationError(error)
            }
            throw new Errors.AppError(
                'RepositoryError',
                'Cannot create Booking',
                'There was some issue while creating the  Booking,Please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId)
            if (data.status) {
                booking.status = data.status
            }
            return booking
        } catch (error) {
            throw new Errors.AppError(
                'RepositoryError',
                'Cannot update the Booking',
                'There was some issue while updating the  Booking,Please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}
module.exports = BookingRepository