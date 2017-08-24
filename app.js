//dependencias
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const express = require('express');
const path = require('path');

//configuracao do server
const config = require('./config');

//aplicacao
const app = express();
const port = config.PORT;
const publicFolder = config.PUBLIC_FOLDER;

//define rotas da api
// const apiRoute = require('./routes/route');

//adicionar cors
app.use(cors());

//body-parser
app.use(bodyparser.json())

//rota estatica para página -
app.use(express.static(path.join(__dirname,publicFolder)))

//Aplica rotas da api
// app.get('/api',apiRoute);

//middleware
app.get('/',(req,res,nxt)=>{
  res.send('\\o/')
})


app.listen(port,()=>{
  console.log(`server at ${port}`);
});
