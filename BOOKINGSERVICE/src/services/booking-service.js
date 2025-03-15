const { BookingRepository } = require('../repository');
const { serverConfig } = require('../config');
const { Errors } = require('../utils');

class BookingService {
    constructor() {
        this.BookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${serverConfig.FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await fetch(getFlightRequestURL);
            if (!response.ok) {
                throw new Errors.ServiceError('Failed to fetch flight details', response.statusText);
            }

            const flight = await response.json();

            if (!flight || !flight.data) {
                throw new Errors.ServiceError('Invalid flight data received', 'Flight data is null or undefined');
            }

            let flightData = flight.data;
            let priceOfTheFlight = flightData.price;

            if (data.totalSeats > flightData.totalSeats) {
                throw new Errors.ServiceError('Booking process failed', 'Insufficient seats in the flight');
            }

            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };


            const booking = await this.BookingRepository.create(bookingPayload);
            console.log('Booking created:', booking);

            const updateFlightRequestURL = `${serverConfig.FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;

            const res = await fetch(updateFlightRequestURL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalSeats: flightData.totalSeats - booking.noOfSeats
                })
            });

            if (!res.ok) {
                throw new Errors.ServiceError('Failed to update flight seats', res.statusText);
            }
            const finalBooking = await this.BookingRepository.update(booking.id, { status: 'Booked' })
            return finalBooking
        } catch (error) {
            if (error.name === 'RepositoryError' || error.name === 'ValidationError') {
                throw error;
            }
            console.error('Error creating booking:', error);
            throw new Errors.ServiceError('Error creating booking', error.message);
        }
    }
}

module.exports = BookingService;

