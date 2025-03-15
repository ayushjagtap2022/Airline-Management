const { FlightService } = require('../services')
const { errorCodes } = require('../utility')
const { SuccessCodes } = errorCodes
const flightService = new FlightService()
const create = async (req, res) => {
    try {
        const flightsRequest = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price
        }
        const flight = await flightService.createFlight(flightsRequest);
        res.status(SuccessCodes.CREATED).send({
            success: true,
            message: "Successfully created a flight",
            data: flight,
            error: {}
        })
    } catch (error) {
        console.error("Error in createFlight controller:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to create flight",
            error: error
        });
    }

}
const getAllFlights = async (req, res) => {
    try {
        const response = await flightService.getAllFlights(req.query);
        res.status(SuccessCodes.OK).send({
            success: true,
            message: "Successfully fetched the flight",
            data: response,
            error: {}
        })
    } catch (error) {
        console.error("Error in getAllflights controller:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to fetched flight",
            error: error
        });
    }
}
const get = async (req, res) => {
    try {
        const response = await flightService.getFlight(req.params.id);
        res.status(SuccessCodes.OK).send({
            success: true,
            message: "Successfully fetched the flight",
            data: response,
            error: {}
        })
    } catch (error) {
        console.error("Error in getAllflights controller:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: " not able to fetch the flight",
            error: error
        });
    }
}
const update = async (req, res) => {
    try {
        const response = await flightService.updateFlight(req.params.id, req.body);
        res.status(SuccessCodes.OK).send({
            success: true,
            message: "Successfully updated the flight",
            data: response,
            error: {}
        })
    } catch (error) {
        console.error("Error in getAllflights controller:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: " not able to update the flight",
            error: error
        });
    }
}
module.exports = {
    create,
    getAllFlights,
    get,
    update
}