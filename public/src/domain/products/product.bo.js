const ProductBO = function ( API ) {
  const ref = this;
  const NO_CONTENT="Não há conteúdo"

  /**
  * Realiza busca e aplica tratamentos.
  */
  this.searchProductCategoryName = function (name,sucesso,erro) {
    if(!name){
      return ref.getAllCategories(sucesso,erro);
    }

    API.searchProductCategoryName(name)
    .then(
      success_searchProductCategoryName.bind({},sucesso),
      error_searchProductCategoryName.bind({},erro),
    )
  }

  /**
  * tratamento de erro de searchProductCategoryName
  */
  function error_searchProductCategoryName(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de searchProductCategoryName
  */
  function success_searchProductCategoryName(callback,response) {
    response = response.data;
    callback(response);
  }

  /**
  * Realiza busca e aplica tratamentos.
  */
  this.searchProductName=function (name,sucesso,erro) {
    if(!name){
      return ref.getAllProducts(sucesso,erro);
    }

    API.searchProductName(name)
    .then(
      success_searchProductName.bind({},sucesso),
      error_searchProductName.bind({},erro),
    )
  }

  /**
  * tratamento de erro de searchProductName
  */
  function error_searchProductName(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de searchProductName
  */
  function success_searchProductName(callback,response) {
    response = response.data;
    callback(response);
  }

  /**
  * Realiza busca e aplica tratamentos em categorias.
  */
  this.getAllCategories=function (sucesso,erro,cache) {
    if(cache){
      return success_getAllCategories(sucesso,JSON.parse(localStorage.getItem('getAllCategories')))
    }
    API.getAllCategories()
    .then(
      success_getCategories.bind({},sucesso),
      error_getCategories.bind({},erro),
    )
  }

  /**
  * tratamento de erro de getAllCategories
  */
  function error_getCategories(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de getAllCategories
  */
  function success_getCategories(callback,response) {
    response = response.data;
    localStorage.setItem('getAllCategories',JSON.stringify(response))
    callback(response);
  }

  /**
  * Realiza busca e aplica tratamentos em produtos .
  */
  this.getAllProducts=function (sucesso,erro,cache) {
    if(cache){
      return success_getAllProducts(sucesso,JSON.parse(localStorage.getItem('getAllProducts')))
    }
    API.getAllProducts()
    .then(
      success_getAllProducts.bind({},sucesso),
      error_getAllProducts.bind({},erro),
    )
  }

  /**
  * tratamento de erro de getAllProducts
  */
  function error_getAllProducts(callback,response) {
    callback(response);
  }

  /**
  * tratamento de sucesso de getAllProducts
  */
  function success_getAllProducts(callback,response) {
    response = response.data.map(mapProduct);
    localStorage.setItem('getAllProducts',JSON.stringify(response))
    callback(response);
  }

  /**
  * Formata array de produtos
  */
  function mapProduct(e ,i ,a) {
    return {
      name:e.name,
      id:e._id,
      description:e.description,
      categories:e.categories,
      // aplica origin do servidor local
      pictures:e.pictures.map(function (ee) {
        ee.src=location.origin+ee.src;
        return ee;
      })
    }
  }

};
