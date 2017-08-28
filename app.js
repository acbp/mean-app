//dependencias
const cors = require('cors');
const bodyparser = require('body-parser');
const express = require('express');
const path = require('path');

//configuracao do server
const config = require('./util/config');
const connection = require('./util/connection');
const apiRoute = require('./routes/route');

// vars de config
const port = config.PORT;
//TODO - analisar multiplos tipos de dbs
// const db_connection = config.DB_CONNECTION; //
const db_url = config.DB;
const publicFolder = config.PUBLIC_FOLDER;

// configura conexão com banco
connection( db_url);

//aplicacao
const app = express();

//adicionar cors
app.use(cors());

//body-parser
app.use(bodyparser.json())

//rota estatica para página -
app.use(express.static(path.join(__dirname,publicFolder)))

//Aplica rotas da api
app.use('/api',apiRoute);

//middleware
app.get('/',(req,res,nxt)=>{
  res.send('\\o/')
})

app.listen(port,()=>{
  console.log(`server at ${port}`);
});
