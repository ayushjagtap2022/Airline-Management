const express = require('express');
const app = express();
const { serverConfig } = require('./config');
const apiRoutes = require('./routes');
const db = require('./models');

const PORT = serverConfig.PORT;

const setupAndStartServer = () => {
    app.use(express.json());
    app.use('/api', apiRoutes);

    db.sequelize.sync({ alter: true }).then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        });
    }).catch(err => {
        console.error("Failed to sync database:", err);
    });
};

setupAndStartServer();
