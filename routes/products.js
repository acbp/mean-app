//fazer tratamentos de rotas para categorias
//Schema/modelo de produtos
const Product = require('../models/product');

//TODO - importar tratamento de erro generico.
function exceptions(name,error) {
  // deve usar res.status(status).send(msg)
}
exceptions=exceptions.bind({},'products');

//configura rotas dos métodos de produtos
const setup = (router) => {
  // pega todos
  router.get('/products',(req,res,nxt) => {
    res.send(`pega produtos`);
    return;
    //TODO - verificar paginação
    // retorna todos os produtos
    Product.find((err,product) => {
      if(err) return exceptions(res,err);
      res.json(product);
    });
  })

  // cadastra item
  router.post('/products',(req,res,nxt) => {
    res.send(`salva novo produto`)

  })

  // pega item com id
  router.get('/products/:id',(req,res,nxt) => {
    res.send(`pega produto por id`);
  })

  // editar item com id
  router.put('/products/:id',(req,res,nxt) => {
    res.send(`edita produto por id`);
  })

  // deleta item com id
  router.delete('/products/:id',(req,res,nxt) => {
    res.send(`deleta produto por id`);
  })
}

module.exports = setup;
