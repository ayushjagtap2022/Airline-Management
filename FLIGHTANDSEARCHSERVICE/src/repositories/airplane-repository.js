const { Airplane } = require('../models')
class AirplaneRepository {
    async getAirplane(id) {
        try {
            let response = await Airplane.findByPk(id)
            return response
        }
        catch (error) {
            console.log("Something went Wrong at the repository layer");
            return { error }
        }
    }
}
module.exports = AirplaneRepository