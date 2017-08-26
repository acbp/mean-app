const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = Schema(
  {
    name:{
      type:String,
      required:true,
      unique:true,
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
    }
    //TODO - verificar formatos para armazenamento de imagens
    // ,picture:{
    //   type:Array,
    //   required:false
    // }
  },
  {
    timestamps:true
  }
);

const Product = mongoose.model('Product',ProductSchema);
Product.factory=(data) => {
  return new Product( {
    name:data.name,
    description:data.description,
    categories:data.categories
  })
}
module.exports = Product;
