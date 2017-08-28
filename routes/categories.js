//Schema/modelo de categoria
const Category = require('../models/category');
const {hasOwnProperty, hasOwnPropertyArr, validate, validateArr } = require('../util/methods');
const exceptions = require('../util/methods').exceptions.bind({},'categories');
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

//configura rotas dos métodos de categoria
const setup = (router) => {
  // pega todos
  router.get('/categories',(req,res,nxt) => {
    //TODO - verificar paginação

    Category.find((err,result) => {
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
  router.post('/categories',(req,res,nxt) => {
    let data = req.body;
    let newCategory = new Category( Category.factory(data) );

    //TODO - validar categorias

    newCategory.save((err,result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      res.json({msg:MSG.SUCCESS.SAVED,id:result._id})
    })
  })

  // pega item com id
  router.get('/categories/:id',(req,res,nxt) => {
    let data = req.params;

    Category.findOne({_id:data.id},(err, result) => {
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
  router.get('/categoriesByName/:name',(req,res,nxt) => {
    let data = req.params;
    console.log(data.name);
    Category.findOne({name:data.name},(err, result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      //caso id não exista
      if(!result) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.name})
      res.json(result)
    })
  })

  // editar item com id
  router.put('/categories/:id',(req,res,nxt) => {
    let data = req.params, body = req.body;

    // valida parametros
    if(validateArr(body,['name','description'])){
      return res.json({msg:MSG.ERROR.INVALID_PARAMS});
    }

    let newCategory = new Category( Category.factory(data) );
    let dataUpdated={
      $set:body
    };

    //acha e atualiza
    Category.findByIdAndUpdate(
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
  router.delete('/categories/:id',(req,res,nxt) => {
    let data = req.params;

    Category.findOneAndRemove({_id:data.id},(err, result) => {
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
