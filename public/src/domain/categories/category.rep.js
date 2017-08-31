const CategoryREP =function (url , http) {
  const g= http.get,
        u= http.put,
        p= http.post,
        d= http.delete
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
    this.searchCategoryName = function (name,options) {
      return g(url+"categoriesByName/"+name,options)
    }

    /**
    * Atualiza categoria
    */
    this.updateCategory= function ( category,options) {
      return u(url+'categories/'+category.id,category)
    }

    /**
    * Deleta categoria
    */
    this.deleteCategory= function ( id,options) {
      return d(url+'categories/'+id)
    }
}
