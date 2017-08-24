//fazer tratamentos de rotas para categorias
const setup = (router) => {
  router.get('/categories',(req,res,nxt) => {
    res.send(`pega categorias`);
  })
  router.get('/categories/:id',(req,res,nxt) => {
    res.send(`pega categoria por id`);
  })
  router.put('/categories/:id',(req,res,nxt) => {
    //TODO - deve modificar todos os produtos com a categoria
    res.send(`edita categoria por id`);
  })
  router.delete('/categories/:id',(req,res,nxt) => {
    //TODO - deve modificar todos os produtos com a categoria
    res.send(`deleta categoria por id`);
  })
}

module.exports = setup;
