const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { rateLimit } = require('express-rate-limit');

const app = express();
const PORT = 3005;

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 10
})


app.use(limiter)
app.use(morgan('combined'));
app.use('/bookingservice', async (req, res, next) => {
    try {
        const response = await fetch('http://localhost:3001/api/v1/users/isauthenticated', {
            headers: {
                "x-access-token": req.headers['x-access-token']
            }
        })
        let result = await response.json();
        console.log(result);
        if (response.ok) {
            next()
        } else {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})
app.use(
    '/bookingservice',
    createProxyMiddleware({
        target: 'http://localhost:3002',
        changeOrigin: true,
        logLevel: 'debug',
    }),
);

app.get('/home', (req, res) => {
    res.send({ message: "OK" });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
