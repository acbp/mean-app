const ProductREP = function (url, http) {
  const g= http.get,
        u= http.put,
        p= http.post,
        d= http.put
        ;

  /**
  * Pega todos os produtos
  */
  this.getAllProducts = function (options) {
    return g(url+'products',options)
  }

  /**
  * Busca produto por nome
  */
  this.searchProductName = function (name,options) {
    return g(url+"productsByName/"+name,options)
  }
}
