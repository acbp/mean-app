const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = Schema({
  _id: Schema.Types.ObjectId,
  name:{
    type:String,
    required:true,
    unique:true
    lowercase: true
  },
  description:{
    type:String,
    required:true,
    lowercase: true
  },
  categories:{
    type:[
      {
        type:Schema.Types.ObjectId,
        refs:'Category'
      }
    ],
    index:true
  },
  updated: { type: Date, default: Date.now },
  //TODO - verificar formatos para armazenamento de imagens
  // ,picture:{
  //   type:Array,
  //   required:false
  // }
});

const Product = module.exports = mongoose.model('Product',ProductSchema);
