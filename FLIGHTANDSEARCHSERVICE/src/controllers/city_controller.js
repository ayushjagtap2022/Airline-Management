const { CityService } = require('../services')
const { errorCodes } = require('../utility')
const { SuccessCodes } = errorCodes
const cityService = new CityService()
const create = async (req, res) => {
    try {

        const { cityName } = req.body;
        let response = await cityService.createCity(cityName)
        return res.status(SuccessCodes.CREATED).json({
            success: true,
            data: response,
            message: "Successfully created a city",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: {},
            message: "Not able to create a ciy",
            err: error
        })
    }

}
const get = async (req, res) => {
    try {
        let response = await cityService.getCity(req.params.id)
        return res.status(SuccessCodes.OK).json({
            success: true,
            data: response,
            message: "Successfully fetched a city",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: {},
            message: "Not able to get the ciy",
            err: error
        })
    }
}
const getAll = async (req, res) => {
    try {
        const response = await cityService.readAllCity()
        return res.status(SuccessCodes.OK).json({
            success: true,
            data: response,
            message: "Successfully fetched all the cities city",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: {},
            message: "Not able to get the ciy",
            err: error
        })
    }

}
const update = async (req, res) => {
    try {
        let response = await cityService.updateCity(req.params.id, req.body)
        return res.status(SuccessCodes.OK).json({
            success: true,
            data: response,
            message: "Successfully fetched a city",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: {},
            message: "Not able to update the ciy",
            err: error
        })
    }
}
const destroy = async (req, res) => {
    try {
        const { cityName } = req.body;
        let response = await cityService.deleteCity(req.params.id, cityName)
        return res.status(SuccessCodes.CREATED).json({
            success: true,
            data: response,
            message: "Successfully deleted a city",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: {},
            message: "Not able to delete the ciy",
            err: error
        })
    }
}
const searchCity = async (req, res) => {
    try {
        const response = await cityService.searchCity(req.query);
        return res.status(SuccessCodes.OK).json({
            success: true,
            data: response,
            message: "Successfully fetched cities",
            error: null
        });
    } catch (error) {
        console.error("Error in searchCity controller:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to fetch cities",
            error: error.message
        });
    }
};
module.exports = {
    create,
    get,
    getAll,
    update,
    destroy,
    searchCity
}