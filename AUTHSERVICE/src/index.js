const express = require('express');
const app = express();
const { serverConfig } = require('./config');
const Routes = require('./routes');
require('dotenv').config();
app.use(express.json());
app.use('/api', Routes);

const prepareAndStartServer = async () => {
    try {
        app.listen(serverConfig.PORT, () => {
            console.log(`Listening on PORT ${serverConfig.PORT}`);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
    }
};

prepareAndStartServer();
