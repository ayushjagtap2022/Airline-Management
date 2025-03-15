const { errorCodes } = require('../utility')
const { ClientErrorsCodes } = errorCodes
const validateFlights = async (req, res, next) => {
    const {
        flightNumber,
        airplaneId,
        departureAirportId,
        arrivalAirportId,
        arrivalTime,
        departureTime,
        price,
    } = req.body;
    if (
        !flightNumber ||
        !airplaneId ||
        !departureAirportId ||
        !arrivalAirportId ||
        !arrivalTime ||
        !departureTime ||
        !price
    ) {
        res.status(ClientErrorsCodes.BAD_REQUEST).json({
            data: {},
            success: false,
            message: "Invalid request body to create a flight",
            error: "Missing manadatory properties to create a flight"
        })
    }
    else {
        next()
    }
}
module.exports = {
    validateFlights
}