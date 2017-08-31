const CategoryREP =function (url , http) {
  const g= http.get,
        u= http.put,
        p= http.post,
        d= http.put
        ;

    /**
    * Pega todos os categorias
    */
    this.getAllCategories = function (options) {
      return g(url+'categories',options)
    }

    /**
    * Busca categoria por nome
    */
    this.searchProductCategoryName = function (name,options) {
      return g(url+"categoriesByName/"+name,options)
    }
}
