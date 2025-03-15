const { CityRepository } = require('../repositories')
class CityService {
    constructor() {
        this.CityRepository = new CityRepository()
    }
    async createCity(data) {
        try {

            let response = await this.CityRepository.createCity(data)
            return response
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error }
        }
    }
    async readAllCity() {
        try {
            let response = await this.CityRepository.readAllCity();
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error }
        }
    }
    async deleteCity(cityId) {
        try {

            let response = await this.CityRepository.deleteCity(cityId)
            return response
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error }
        }
    }
    async updateCity(id, data) {
        try {

            let response = await this.CityRepository.updateCity(id, data)
            return response
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error }
        }
    }
    async getCity(cityId) {
        try {
            let response = await this.CityRepository.getCity(cityId)
            return response
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error }
        }
    }
    async searchCity(filter) {
        try {
            let response = await this.CityRepository.searchCity({ name: filter.name });
            return response
        } catch (error) {
            console.error("Something went wrong at service layer:", error);
            throw error;
        }
    }

}
module.exports = CityService