const express = require('express');
const { server_config, logger } = require('./config/index');
const PORTS = server_config.PORT || 3000;
const ApiRoutes = require('./routers')
const { sequelize } = require('./models');
const setupAndStartServer = async () => {
    try {
        const app = express();
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use('/api', ApiRoutes)
        if (server_config.DB_SYNC) {
            await sequelize.sync({ alter: true });
        }
        app.listen(PORTS, () => {
            console.log(`Listening on port ${PORTS}`);
            logger.info({ message: "Info level logger", label: "Info Label" })
        })
    } catch (error) {
        console.log(error);
    }
}
setupAndStartServer()