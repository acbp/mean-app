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

  /**
  * Cria/Atualiza imagem produto
  */
  this.uploadImage=function (id,data,options) {
    return axios.post(url+'products/picture/'+id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // angular não está permitindo o envio de multipart.
    return p(url+'products/picture/'+id,data,options);
  }

  /**
  * Deleta imagem de produto
  */
  this.deleteImage=function (id,options) {
    return d(url+'products/picture/'+id,options);
  }

  /**
  * Cria produto
  */
  this.saveProduct =function ( product,options ) {
    return p(url+"products", product, options)
  }

  /**
  * Atualiza produto
  */
  this.updateProduct =function ( product,options ) {
    return u(url+"products/"+product.id, product, options)
  }

  /**
  * Deleta produto
  */
  this.deleteProduct= function ( id, options) {
    return d(url+'products/'+id)
  }
}
