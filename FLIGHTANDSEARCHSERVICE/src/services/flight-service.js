const { Flights } = require('../models')
const { FlightRepository, AirplaneRepository, CrudRepository } = require('../repositories')
const { helperFunctions } = require('../utility')
class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }
    async createFlight(data) {
        try {
            if (!(helperFunctions.compareTime(data.arrivalTime, data.departureTime))) {
                throw { error: "Arrival time cannot be less than Departure time " }
            }
            let airplane = await this.airplaneRepository.getAirplane(data.airplaneId)
            const flight = await this.flightRepository.createFlight({
                ...data,
                totalSeats: airplane.capacity
            });
            return flight
        } catch (error) {
            console.log("something went wrong at service layer");
            throw { error }
        }
    }
    async getAllFlights(data) {
        try {
            const flights = await this.flightRepository.getAllFlights(data)
            return flights
        } catch (error) {
            console.log("something went wrong at service layer");
            throw { error }
        }
    }
    async getFlight(flightId) {
        try {
            const flights = await this.flightRepository.getFlight(flightId)
            return flights
        } catch (error) {
            console.log("something went wrong at service layer");
            throw { error }
        }
    }
    async updateFlight(flightId, data) {
        try {
            this.crudRepository = new CrudRepository(Flights);
            const response = await this.crudRepository.update(flightId, data)
            return response
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error }
        }
    }
}
module.exports = FlightService