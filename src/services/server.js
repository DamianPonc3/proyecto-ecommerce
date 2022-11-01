const express = require('express');
const http = require('http');
const path = require('path');
const router = require('../routes/productos');

const app = express();
const server = http.Server(app)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const viewsFolderPath = path.resolve(__dirname, '../../views');
app.set('views', viewsFolderPath);
app.set('view engine', 'pug');

app.use('/', router)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});

module.exports = server;