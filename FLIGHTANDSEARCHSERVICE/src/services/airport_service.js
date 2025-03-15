const { AirportRepository } = require('../repositories');
const CrudService = require('./crud_service');

class AirportService extends CrudService {
    constructor() {
        const airportRepository = new AirportRepository();
        super(airportRepository);
    }
}

module.exports = AirportService;
