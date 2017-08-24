//depenedencias
const express = require('express');
const Routes = express.Routes();

//configuracoes de rotas
const products = require('products');
const categories = require('categories');

products.setup(Routes);
categories.setup(Routes);

module.exports = Routes;
