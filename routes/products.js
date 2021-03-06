//Schema/modelo de produtos
const Product = require('../models/product');
const Category = require('../models/category');
const {hasOwnProperty, hasOwnPropertyArr, validate, validateArr } = require('../util/methods');
const exceptions = require('../util/methods').exceptions.bind({},'products');
const MSG = require('../util/strings').MSG;
const multiparty = require('connect-multiparty')();
const gfs = require('../util/connection').gfs;
const fs = require('fs');

// deleta imagem do banco
const deletarImagem =(gridfs,query,success,error) => {
  gridfs.exist(query, (err, found)=>{
    if(err) {
      console.error(MSG.ERROR.ON_DELETE);
      return error && error(err);
    }

    // msg de não encontrado
    if(!found){
      console.error(MSG.ERROR.NOT_FOUND);
      return error && error(err);
    }

    gridfs.remove(query, (err)=>{

      if(err) {
        console.error(MSG.ERROR.ON_DELETE);
        return error && error(err);
      }
      console.log(MSG.SUCCESS.DELETED)  ;
      if(success){
        success();
      }
    });
  });
}

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

  // recebe imagem do produto.
  router.post('/products/picture/:id',multiparty,(req,res,nxt) => {
    let data=req.params, files = req.files.image, gridfs=gfs();

    // se maior q 3.8 MiB impede upload.
    if(files.size > 32735232  ){
      return res.status(400).json({msg:MSG.ERROR.TOO_LARGE})
    }

    //cria fluxo de escrita
    let writestream = gridfs.createWriteStream({
     filename: files.name,
     mode: 'w',
     content_type: files.type,
     metadata: req.body
    });

    //cria arquivo em memoria
    fs.createReadStream(files.path).pipe(writestream);

    // ao terminar de baixar aquivo salva em banco
    writestream.on('close', (file) => {
      let path = `/api/products/picture/${file._id}`;

      //acha o produto que será inserido a imagem
      Product.findById(data.id, (err, product) => {
        if(err) {
          res.status(500);
          return exceptions(res,err)
        }

        if(validate(product.pictures,'length')){
          //
          product.pictures=product.pictures.filter((elm) => {
            let boo =elm.filename !== files.name;
            //deleta elemento duplicado
            if(!boo){
              deletarImagem(gridfs,{_id:elm.picture_id})
            }
            return boo;
          })
        }

        //adiciona dados da imagem no produto
        product.pictures.push(
          {
            picture_id:file._id,
            filename: files.name,
            format:files.type,
            src:path
          }
        );

        //salva
        product.save((err, result) =>{
          if(err) {
            res.status(500);
            return exceptions(res,err)
          }
          return res.status(200).json(
            {
              msg:MSG.SUCCESS.UPDATED,
              id:data.id,
              src:req.headers.origin+path
            }
          )
        })
      });

      //limpa memoria ref da imagems após upload para banco
      fs.unlink(files.path, (err)=> {
        if(err) {
          res.status(500);
          return exceptions(res,err)
        }
      });
   });
  })

  // retorna imagem
  router.get('/products/picture/:id',(req,res,nxt) => {
    let data = req.params;

    //acha produto com foto
    Product.findOne({"pictures.picture_id":data.id}, (err, product) => {
      if(err) {
        res.status(500)
        return exceptions(res,err)
      }

      if(!product) return res.status(404).end();

      //inicia leitura de imagem do banco
      let readstream = gfs().createReadStream({
         _id: req.params.id
      });

      readstream.on("error", function(err){
        res.status(204).end();
      });

      //envia stream para usuario
      readstream.pipe(res);
    })
  })

  //deleta imagem
  router.delete('/products/picture/:id',(req,res,nxt) => {
    let query ={_id:req.params.id}
    deletarImagem(gfs(),query,
      //sucesso
      () => {
        // deleta remove referencia
        Product.findOne({"pictures.picture_id":{$in:query._id}}, (err, product) => {
          if(err) {
            res.status(500);
            return exceptions(res,err)
          }

          // valida pictures
          if(!validate(product.pictures,'length')){
            return res.status(204).json({msg:[MSG.SUCCESS.DELETED,MSG.SUCCESS.NOT_FOUND]})
          }

          //limpa foto deletada
          product.pictures=product.pictures.filter((elm) => elm.picture_id !== query._id )

          //salva
          product.save((err, result) =>{
            if(err) {
              res.status(500);
              return exceptions(res,err)
            }
            return res.status(200).json({msg:MSG.SUCCESS.UPDATED})
          })
        })

        // res.status(200).json({msg:MSG.SUCCESS.DELETED});
      },
      () => {
        res.status(400).json({msg:MSG.ERROR.ON_DELETE});
      }
    )
  })

  // cadastra item
  router.post('/products',(req,res,nxt) => {
    let data = req.body;
    let newProduct = new Product( Product.factory(data) );

    newProduct.save((err,result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      res.status(201).json({msg:MSG.SUCCESS.SAVED,id:result._id})
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

    Product.find({name:{ "$regex": data.name, "$options": "i" }},(err, result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      //caso id não exista
      if(!result) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.name})
      res.json(result)
    })
  })

  // pega item por nome decategorias
  router.get('/productsByCategoryName/:name',(req,res,nxt) => {
    let data = req.params;

    Category.find({name:{ "$regex": data.name, "$options": "i" }},(err,categories) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      if(!categories) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.name})

      // procura
      Product.find({'categories':{$in:categories}},(err, products) => {
        if(err) {
          res.status(500);
          return exceptions(res,err)
        }
        //caso id não exista
        if(!products) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.name})
        res.json(products)
      })

    })
  })

  // pega item com categorias
  router.get('/productsByCategoryId',(req,res,nxt) => {
    let data = req.query;

    //se não houver parametros
    if(!validate(data,'categories')){
      return res.status(400).json({msg:MSG.ERROR.INVALID_PARAMS});
    }

    let arr = data.categories.split(',');

    Product.find({'categories':{$in:arr}},(err, result) => {
      if(err) {
        res.status(500);
        return exceptions(res,err)
      }
      if(!validate(result,'length')) return res.status(204).json({msg:MSG.ERROR.NOT_FOUND,id:data.categories})
      res.json(result)
    })
  })

  // editar item com id
  router.put('/products/:id',(req,res,nxt) => {
    let query = req.params, body = req.body;

    let newProduct = new Product( Product.factory(query) );
    let dataUpdated={
        $set:{
          name:body.name,
          description:body.description,
          categories:body.categories
        }
      };

    //acha e atualiza
    Product.findByIdAndUpdate(
      query.id,
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

      res.status(200).json({msg:MSG.SUCCESS.DELETED,data:result})
    })
  })
}

module.exports = setup;
