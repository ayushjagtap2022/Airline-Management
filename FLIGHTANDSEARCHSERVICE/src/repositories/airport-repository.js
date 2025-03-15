const CrudRepository = require('./crud-repository');
const { Airport } = require('../models'); // Ensure this path is correct

class AirportRepository extends CrudRepository {
    constructor() {
        super(Airport);
    }
}

module.exports = AirportRepository;
