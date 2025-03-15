const { Op } = require('sequelize')
const { City } = require('../models');
class CityRepository {
    async createCity(data) {
        try {
            console.log(data)
            let response = await City.create({ name: data });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async readAllCity() {
        try {
            let response = await City.findAll();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateCity(id, data) {
        try {
            let response = await City.findByPk(id);
            response.name = data.cityName;
            await response.save()
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteCity(cityId) {
        try {
            let response = await City.destroy({
                where: { id: cityId }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getCity(id) {
        try {
            let response = await City.findByPk(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async searchCity(filter) {
        try {
            if (filter.name) {
                let response = await City.findAll({
                    where: {
                        name: { [Op.regexp]: `${filter.name}` },
                    },
                });
                return response
            }
            let response = await City.findAll();
            return response
        } catch (error) {
            console.error("Something went wrong at repository layer:", error);
            throw error;
        }
    }
}

module.exports = CityRepository;
