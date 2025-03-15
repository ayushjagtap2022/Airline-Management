const { AirportService } = require('../services');
const { errorCodes } = require('../utility')
const { SuccessCodes } = errorCodes
const airportService = new AirportService();

const create = async (req, res) => {
    try {
        const response = await airportService.create(req.body);
        res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            err: {},
            message: "Successfully created the airport"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: "Cannot create a new airport"
        });
    }
};

module.exports = {
    create
};
