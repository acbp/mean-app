//fazer tratamentos de rotas para categorias
//Schema/modelo de produtos
const Product = require('../models/product');

//TODO - adicionar exceptions, hasOwnProperty e hasOwnPropertys em arquivo de "util"
function exceptions(name,res,error) {
  // deve usar res.status(status).send(msg)
  res.send(`exception[${name}]:${error}`)
}
exceptions=exceptions.bind({},'products');

//valida existencia de uma propriedade
function hasOwnProperty(elm, param) {
  return elm.hasOwnProperty(param);
}

//verifica existencia de um conjunto de propriedades
function hasOwnPropertyArr(elm, params) {
  return params.some(Array.hasOwnProperty.bind(elm))
}

//valida nulidade
function validate(e, param) {
  console.log(`${param} = ${e.hasOwnProperty(param)} && ${!e[param]}`);
  return e.hasOwnProperty(param) && e[param];
}

//valida nulidade de um conjunto
function validateArr(e, params) {
  return !params.every(validate.bind(e,e));
}

//configura rotas dos métodos de produtos
const setup = (router) => {
  // pega todos
  router.get('/products',(req,res,nxt) => {
    // res.send(`pega produtos`);
    // return;

    //TODO - verificar paginação
    // retorna todos os produtos
    Product.find((err,product) => {
      if(err) return exceptions(res,err);
      res.json(product);
    });
  })

  // cadastra item
  router.post('/products',(req,res,nxt) => {
    let data = req.body;
    let newProduct = new Product( Product.factory(data) );

    //TODO - validar categorias

    newProduct.save((err,product) => {
      if(err) return exceptions(res,err);
      res.json({msg:'Produto salvo'})
    })
  })

  // pega item com id
  router.get('/products/:id',(req,res,nxt) => {
    if(hasOwnProperty(req,'id')) {
      return res.json({msg:"Sem paramêtro 'id'"})
    }

    Product.findOne({_id:req.params.id},(err, result) => {
      if(err) return exceptions(res,err);
      res.json(result)
    })
  })

  // editar item com id
  router.put('/products/:id',(req,res,nxt) => {
    let data = req.params, body = req.body;

    //verifica id
    if(hasOwnProperty(req,'id')) {
      return res.json({msg:"Sem paramêtro 'id'"});
    }

    // valida parametros
    if(validateArr(body,['name','description'])){
      return res.json({msg:"Há paramêtros invalidos."});
    }

    let newProduct = new Product( Product.factory(data) );

    Product.findByIdAndUpdate(
      //id
      data.id,
      // dados a serem atualizados
      {
        $set:body
      },
      // callback
      (err,result) => {
          if(err) return exceptions(res,err);
          res.status(200).send("Produto atualizado")
      }
    )
  })

  // deleta item com id
  router.delete('/products/:id',(req,res,nxt) => {
    if(hasOwnProperty(req,'id')){
      return res.json({msg:"Sem paramêtro 'id'"})
    }

    Product.remove({_id:req.params.id},(err, result) => {
      if(err) return exceptions(res,err);
      //TODO - atualizar lista de categorias do produto deletado
      res.json({msg:"Produto removido."})
    })
  })
}

module.exports = setup;
