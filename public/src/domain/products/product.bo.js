const ProductBO = function ( API) {
  const ref = this;

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
  * Realiza busca e aplica tratamentos em produtos .
  */
  this.getAllProducts=function (sucesso,erro,cache) {
    if(cache){
      cache=JSON.parse(localStorage.getItem('getAllProducts'));
      if(cache){
        return success_getAllProducts(sucesso,cache,false)
      }
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
  function success_getAllProducts(callback,response,cache) {
    if(!cache){
      localStorage.setItem('getAllProducts',JSON.stringify(response))
    }
    response = response.data.map(mapProduct);
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
