const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level} ${message}`;
});


const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'events.log',
            dirname: 'logs',
            level: 'info',
        }),
        new transports.File({
            filename: 'errors.log',
            dirname: 'logs',
            level: 'error',
        }),
        new transports.File({
            filename: 'warn.log',
            dirname: 'logs',
            level: 'warn',
        })
    ],
});

module.exports = logger;