const express = require('express')
const app = express();
const { serverConfig } = require('./config')
const { jobs, messageQueue } = require('./utility');
const apiRoutes = require('./routes')
const { ticketService } = require('./services')
const setupAndStartServer = async () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', apiRoutes)
    const channel = await messageQueue.createChannel();
    messageQueue.subscribeMessage(channel, ticketService.subscribeEvents, serverConfig.REMINDER_BINDING_KEY)
    // jobs.setupJobs();
    app.listen(serverConfig.PORT, () => {
        console.log(`Server started at PORT ${serverConfig.PORT}`);
    })
}
setupAndStartServer()