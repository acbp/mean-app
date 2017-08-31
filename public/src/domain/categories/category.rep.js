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
    * Cria/Atualiza imagem categoria
    */
    this.uploadImage=function (id,data,options) {
      return axios.post(url+'categories/picture/'+id, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // angular não está permitindo o envio de multipart.
      return p(url+'categories/picture/'+id,data,options);
    }

    /**
    * Deleta imagem de categoria
    */
    this.deleteImage=function (id,options) {
      return d(url+'categories/picture/'+id,options);
    }

    /**
    * Cria categoria
    */
    this.saveCategory= function ( category,options) {
      return p(url+'categories',category, options)
    }

    /**
    * Atualiza categoria
    */
    this.updateCategory= function ( category,options) {
      return u(url+'categories/'+category.id,category,options)
    }

    /**
    * Deleta categoria
    */
    this.deleteCategory= function ( id,options) {
      return d(url+'categories/'+id,options)
    }
}
