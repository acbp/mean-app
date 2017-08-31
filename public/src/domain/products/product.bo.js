const ProductBO = function ( API) {
  const ref = this;

  function serialize(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  /**
  * Realiza busca e aplica tratamentos.
  */
  this.searchProductCategoryName=function (name,sucesso,erro) {
    if(!name){
      return ref.getAllProducts(sucesso,erro);
    }

    API.searchProductCategoryName(name)
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
  this.getAllProducts=function (sucesso,erro) {
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
