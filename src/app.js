const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const router = express.Router();
const app = express();

//Conectando ao banco
mongoose.connect('mongodb+srv://admin:admin@cluster0-c2ji7.mongodb.net/test?retryWrites=true&w=majority');

//carrega os models
const Product = require('./models/products')
const Customer = require('./models/customer')
const Order = require('./models/order')



//carrega as rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');



app.use(express.json())

app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);



module.exports = app;