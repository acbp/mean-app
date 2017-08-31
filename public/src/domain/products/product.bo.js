const ProductBO = function ( API) {
  const ref = this;
  var cacheAllProducts; // guarda ultima lista de produtos
  var cacheAllCategories; // guarda ultima lista de categorias
  this.openModal;

  /**
  * Exibe produto
  */
  this.viewProduct=function (product ,s,e) {
    var modal=ref.openModal(
      {
        templateUrl:'src/domain/products/modal.product.html',
        controller:'modalProductCtrl',
        resolve:{
          product:function () {
            return product;
          }
        }
      }
    )
  }

  /**
  * Exibe produto
  */
  this.deleteProduct=function (product) {
    var modalInstance = ref.openModal(
      {
        templateUrl:'src/domain/common/modal.delete.html',
        controller:'modalDeleteCtrl',
        size:"sm"
      }
    )

    modalInstance.result.then( ref.delProduct.bind({},product.id));
  }

  /**
  * Deleta um produto por id
  */
  this.delProduct = function (id,sucesso,erro) {
    if(!id){
      return error_delProduct(erro);
    }
    API.deleteProduct(id).then(
      success_delProduct.bind({},sucesso),
      error_delProduct.bind({},erro),
    )
  }

  /**
  * Tratamento de erro para 'delProduct'
  */
  function error_delProduct(callback,response) {
    callback(response)
  }

  /**
  * Tratamento de sucesso para 'delProduct'
  */
  function success_delProduct(callback,response) {
    callback(response)
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
    response = cacheAllProducts= response.data.map(mapProduct);
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
