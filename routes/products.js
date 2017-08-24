//fazer tratamentos de rotas para categorias
const setup = (router) => {
  router.get('/products',(req,res,nxt) => {
    res.send(`pega produtos`);
  })
  router.get('/products/:id',(req,res,nxt) => {
    res.send(`pega produto por id`);
  })
  router.put('/products/:id',(req,res,nxt) => {
    res.send(`edita produto por id`);
  })
  router.delete('/products/:id',(req,res,nxt) => {
    res.send(`deleta produto por id`);
  })
}

module.exports = setup;
