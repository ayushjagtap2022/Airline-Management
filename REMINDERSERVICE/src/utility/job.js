const cron = require('node-cron');
const { sendBasicMail } = require('./send-email')

const setupJobs = () => {
    try {
        cron.schedule('*/1 * * * *', async () => {
            sendBasicMail()
        });
    } catch (error) {
        console.error('Error setting up cron job:', error);
    }
};

module.exports = {
    setupJobs
};
