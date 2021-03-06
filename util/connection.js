const mongoose = require('mongoose');
const Gridfs = require('gridfs-stream');
const mongoDriver = mongoose.mongo;
const OPEN='open';
const CONNECTED='connected';
const CLOSE='close';
const ERROR='error';
var _gfs;

const listeners={
  db:'',
  events:[]
};


function connect(url) {
  mongoose.connect( listeners.db = url );
  return connection;
}

function addOnceListener(type,fn) {
  mongoose.connection.once(type,fn);
  return connection;
}

function addListener(type,fn) {
  mongoose.connection.on(type,fn);
  listeners.events.push({
    type:type,
    fn:fn
  })
  return connection;
}

function closeConnection() {
  mongoose.connection.close();
  listeners.events=[];
  return connection;
}


function setup(url) {
  connect(url);
  addOnceListener(CONNECTED,() => {
    console.log(`[ Mongodb @ ${url} ]`);
    // configura GridFS para armazenamento de imagens
  })
  addListener(ERROR,(err) => {
    if(err){
      console.error(`Mongodb error ao conectar.\n>>>>\n${err}\n<<<<`);
    }
  })
  return connection;
}

const connection = {
  setup:setup,
  to:connect,
  once:addOnceListener,
  on:addListener,
  gfs:() => new Gridfs(mongoose.connection.db, mongoose.mongo),
  close:closeConnection,
  OPEN:OPEN,
  CONNECTED:CONNECTED,
  CLOSE:CLOSE,
  ERROR:ERROR
}

module.exports = connection;
