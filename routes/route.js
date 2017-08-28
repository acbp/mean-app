//depenedencias
const express = require('express');
const router = express.Router();

//configuracoes de rotas
const products = require('./products');
const categories = require('./categories');

products(router);
categories(router);

//middleware api
// router.get('/',(req,res,nxt) => {
//   //TODO - deve pegar qual é o tipo de de autenticacao escolhida?
//   //TODO - auth
//   res.send(``);
// })

module.exports = router;
