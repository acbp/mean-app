//Schema/modelo de produtos
const Product = require('../models/product');
const {hasOwnProperty, hasOwnPropertyArr, validate, validateArr } = require('../util/methods');
const exceptions = require('../util/methods').exceptions.bind({},'products');
const MSG = require('../util/strings').MSG;

// exceptions(
//  {
//   status:(m) => {
//       console.log(`status ${m}`);
//     },
//     send:(l) => {
//       console.log(`msg ${l}`);
//     }
//   },'blabla',200
// )

//configura rotas dos métodos de produtos
const setup = (router) => {
  // pega todos
  router.get('/products',(req,res,nxt) => {
    //TODO - verificar paginação

    Product.find((err,result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      //se estiver vazio retorn 204
      if (!validate(result,'length') ) {
        return res.status(204).end()
      }
      res.json(result);
    });
  })

  // cadastra item
  router.post('/products',(req,res,nxt) => {
    let data = req.body;
    let newProduct = new Product( Product.factory(data) );

    //TODO - validar categorias

    newProduct.save((err,result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      res.json({msg:MSG.SUCCESS.SAVED,id:result._id})
    })
  })

  // pega item com id
  router.get('/products/:id',(req,res,nxt) => {
    let data = req.params;

    Product.findOne({_id:data.id},(err, result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      //caso id não exista
      if(!result) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.id})
      res.json(result)
    })
  })

  // pega item com nome
  router.get('/productsByName/:name',(req,res,nxt) => {
    let data = req.params;

    Product.findOne({name:data.name},(err, result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      //caso id não exista
      if(!result) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.name})
      res.json(result)
    })
  })

  // pega item com categorias
  router.get('/productsByCategory/:categories',(req,res,nxt) => {
    let data = req.params;

    Product.find({categories:data.categories},(err, result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      //caso id não exista
      if(!result) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.categories})
      res.json(result)
    })
  })


  // editar item com id
  router.put('/products/:id',(req,res,nxt) => {
    let data = req.params, body = req.body;

    // valida parametros
    if(validateArr(body,['name','description'])){
      return res.json({msg:MSG.ERROR.INVALID_PARAMS});
    }

    let newProduct = new Product( Product.factory(data) );
    let dataUpdated={
        $set:body
      };

    //acha e atualiza
    Product.findByIdAndUpdate(
      data.id,
      dataUpdated,
      (err,result) => {
          if(err) {
            res.status(500);
            return exceptions(res,err)
          }

          //caso id não exista
          if(!result) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.id})

          res.status(200).json({msg:MSG.SUCCESS.UPDATED,id:result._id})
      }
    )
  })

  // deleta item com id
  router.delete('/products/:id',(req,res,nxt) => {
    let data = req.params;

    Product.findOneAndRemove({_id:data.id},(err, result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }

      //caso id não exista
      if(!result) return res.status(204).end();

      //TODO - atualizar lista de categorias do produto deletado

      res.status(200).json({msg:MSG.SUCCESS.DELETED,data:result})
    })
  })
}

module.exports = setup;
