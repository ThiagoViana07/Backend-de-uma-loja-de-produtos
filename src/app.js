const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const router = express.Router();
const app = express();

//Conectando ao banco
mongoose.connect('mongodb+srv://admin:admin@cluster0-c2ji7.mongodb.net/test?retryWrites=true&w=majority');

//carrega os models
const Product = require('./models/products')

//carrega as rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');

app.use(express.json())

app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;