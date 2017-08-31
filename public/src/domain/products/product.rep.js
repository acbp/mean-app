const ProductREP = function (url, http) {
  const g= http.get,
        u= http.put,
        p= http.post,
        d= http.delete
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

  /**
  * Busca categoria por nome
  */
  this.searchProductCategoryName = function (name,options) {
    return g(url+"productsByCategoryName/"+name,options)
  }
}
