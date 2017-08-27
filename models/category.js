//TODO - atualziar como foi feito com prodct.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO - verificar formatos para armazenamento de imagens
const CategorySchema = Schema(
  {
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

    // ,picture:{
    //   type:Buffer [Buffer] ,
    //   required:false
    // }
  },
  {
    timestamps:true
  }
);

const Category = mongoose.model('Category',CategorySchema);
Category.factory=(data) => {
  return new Category( {
    name:data.name,
    description:data.description
  })
}
module.exports = Category;
