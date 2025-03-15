const { Flights } = require('../models')
const { Op } = require('sequelize')
class FlightRepository {
    #createFilter(data) {
        let filter = {};
        if (data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId
        }
        if (data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId
        }
        let priceFilter = []
        if (data.minPrice) {
            priceFilter.push({ price: { [Op.gte]: data.minPrice } })
        }
        if (data.maxPrice) {
            priceFilter.push({ price: { [Op.lte]: data.maxPrice } })
        }
        Object.assign(filter, { [Op.and]: priceFilter })
        console.log(filter);
        return filter
    }

    async createFlight(data) {
        try {
            const response = await Flights.create(data);
            return response
        } catch (error) {
            console.log(error.message);
            throw { error }
        }
    }
    async getAllFlights(filter) {
        try {
            const filterObject = this.#createFilter(filter)
            const flights = await Flights.findAll({
                where: filterObject
            });
            return flights
        } catch (error) {
            throw { error }
        }
    }
    async getFlight(flightId) {
        try {

            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            throw { error }
        }
    }
}
module.exports = FlightRepository