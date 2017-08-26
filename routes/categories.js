//fazer tratamentos de rotas para categorias
//Schema/modelo de categorias
const Category = require('../models/category');

//configura rotas dos métodos de categorias
const setup = (router) => {
  //pega todos
  router.get('/categories',(req,res,nxt) => {
    res.send(`pega categorias`);
    return;
    Category.find((err,product) => {
      if(err) return exceptions(err);
      res.json(product);
    });
  })

  //cadastra produto
  router.post('/categories',(req,res,nxt) => {
    res.send(`salva novo categoria`)
  })

  //pega por id
  router.get('/categories/:id',(req,res,nxt) => {
    res.send(`pega categoria por id`);
  })

  //edita item com id
  router.put('/categories/:id',(req,res,nxt) => {
    //TODO - deve modificar todos os categorias com a categoria
    res.send(`edita categoria por id`);
  })

  //deleta item com id
  router.delete('/categories/:id',(req,res,nxt) => {
    //TODO - deve modificar todos os categorias com a categoria
    res.send(`deleta categoria por id`);
  })
}

module.exports = setup;
