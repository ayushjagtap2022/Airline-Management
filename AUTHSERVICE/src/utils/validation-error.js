const { StatusCodes } = require('http-status-codes');
AppError = require('./error-handler');
class ValidationError extends AppError {
    constructor(error) {
        let explaination = error.errors.map(err => {
            return err.message;
        });
        let errorName = error.name;
        console.log(error + "bro");
        super(
            errorName,
            'Not able to validate the data sent in the request',
            explaination[0],
            StatusCodes.BAD_REQUEST
        );
    }
}
module.exports = ValidationError