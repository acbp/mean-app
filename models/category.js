const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
    //TODO - verificar formatos para armazenamento de imagens
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
