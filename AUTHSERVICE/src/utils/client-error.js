const { StatusCodes } = require('http-status-codes');
AppError = require('./error-handler');
class ClientError extends AppError {
    constructor(name, message, explaination, statusCodes) {
        super(
            name,
            message,
            explaination,
            statusCodes
        );
    }
}
module.exports = ClientError