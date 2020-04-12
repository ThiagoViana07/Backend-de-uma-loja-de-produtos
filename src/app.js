const express = require('express');
//const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const config = require('./config')

const router = express.Router();
const app = express();

//Conectando ao banco
mongoose.connect(config.connectionString);

//carrega os models
const Product = require('./models/products')
const Customer = require('./models/customer')
const Order = require('./models/order')



//carrega as rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.json())

app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);



module.exports = app;