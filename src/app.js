const express = require('express');
const bodyParser = require('body-parser')

const router = express.Router();
const app = express();

//carrega as rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');

app.use(express.json())

app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;