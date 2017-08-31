//Schema/modelo de categoria
const Category = require('../models/category');
const Product = require('../models/product');
const {hasOwnProperty, hasOwnPropertyArr, validate, validateArr } = require('../util/methods');
const exceptions = require('../util/methods').exceptions.bind({},'categories');
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
      console.log(MSG.SUCCESS.DELETED);
      if(success){
        success();
      }
    });
  });
}

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

  // recebe imagem do categoria.
  router.post('/categories/picture/:id',multiparty,(req,res,nxt) => {
    let data=req.params, files = req.files.image,gridfs=gfs();

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
      //constroi endereço da imagem
      let path = `/api/categories/picture/${file._id}`;

      //acha o categoria que será inserido a imagem
      Category.findById(data.id, (err, category) => {
        if(err) {
          res.status(500);
          return exceptions(res,err)
        }

        if(category.pictures && category.pictures.picture_id){
          deletarImagem(gridfs,{_id:category.pictures.picture_id})
        }

        //adiciona dados da imagem no categoria
        category.pictures= {
          picture_id:file._id,
          filename: files.name,
          format:files.type,
          src:path
        };

        //salva
        category.save((err, result) =>{
          if(err) {
            res.status(500);
            return exceptions(res,err)
          }
          return res.status(200).json(
            {
              msg:MSG.SUCCESS.UPDATED,
              id:data.id,
              src:path
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
  router.get('/categories/picture/:id',(req,res,nxt) => {
    let data = req.params;

    //acha categoria com foto
    Category.findOne({"pictures.picture_id":data.id}, (err, category) => {
      if(err) {
        res.status(500)
        return exceptions(res,err)
      }

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
  router.delete('/categories/picture/:id',(req,res,nxt) => {
    let query={_id:req.params.id};
    deletarImagem(gfs(),query,
      //sucesso
      () => {
        // deleta remove referencia
        Category.findOne({"pictures.picture_id":query._id}, (err, category) => {
          if(err) {
            res.status(500);
            return exceptions(res,err)
          }

          //limpa foto deletada
          category.pictures=undefined;

          //salva
          category.save((err, result) =>{
            if(err) {
              res.status(500);
              return exceptions(res,err)
            }
            return res.status(200).json({msg:`${MSG.SUCCESS.DELETED} e ${MSG.SUCCESS.UPDATED}`})
          })
        })

      },
      () => {
        res.status(400).json({msg:MSG.ERROR.ON_DELETE});
      }
    )
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
      if(!result) return res.status(404).json({msg:MSG.ERROR.NOT_FOUND,id:data.id})
      res.json(result)
    })
  })

  // pega item com nome
  router.get('/categoriesByName/:name',(req,res,nxt) => {
    let data = req.params;

    Category.find({name:{ "$regex": data.name, "$options": "i" }},(err, result) => {
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
      $set:{
        name:body.name,
        description:body.description
      }
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
      if(!result) return res.status(404).end();

      // deleta remove referencia de produto
      Product.findOne({"categories":data.id}, (err, product) => {
        if(err) {
          res.status(500);
          return exceptions(res,err)
        }

        // valida pictures
        if(!validate(product.categories,'length')){
          return res.status(204).json({msg:`${MSG.SUCCESS.DELETED} e ${MSG.SUCCESS.NOT_FOUND}`})
        }

        //limpa foto deletada
        product.categories=product.categories.filter((elm) => ""+elm !== data.id )

        //salva
        product.save((err, result) =>{
          if(err) {
            res.status(500);
            return exceptions(res,err)
          }
          return res.status(200).json({msg:`${MSG.SUCCESS.DELETED} e ${MSG.SUCCESS.UPDATED}`})
        })
      })
    })
  })
}

module.exports = setup;
