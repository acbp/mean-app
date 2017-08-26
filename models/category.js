//TODO - atualziar como foi feito com prodct.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = Schema({
  _id: Schema.Types.ObjectId,
  name:{
    type:String,
    required:true,
    unique:true,
    lowercase: true
  },
  description:{
    type:String,
    required:false,
    lowercase: true
  },
  updated: { type: Date, default: Date.now }
  //TODO - verificar formatos para armazenamento de imagens
  // ,picture:{
  //   type:Buffer [Buffer] ,
  //   required:false
  // }

});

const Category = module.exports = mongoose.model('Category',CategorySchema);
