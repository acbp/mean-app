

app.controller('productCtrl', productCtrl);

productCtrl.$inject =[ '$scope','API','$http'];

function productCtrl($scope,API,$http) {
  const productBO = new ProductBO( new ProductREP(API,$http) );
  const categoryBO = new CategoryBO( new CategoryREP(API,$http) );

  var cacheAllProducts; // guarda ultima lista de produtos
  var cacheAllCategories; // guarda ultima lista de categorias
  $scope.products;

  /**
  * Pega todos os produtos
  */
  $scope.getAllProducts=function (cache) {
    productBO.getAllProducts(success_getProducts,error_getProducts,cache)
  }

  /**
  * Tratamento de sucesso para 'getAllProducts'.
  */
  function success_getProducts(r) {
    $scope.products=cacheAllProducts=r;
  }

  /**
  * Tratamento de erro para 'getAllProducts'.
  */
  function error_getProducts(r) {
    // tratamento por status
      console.error('error_getProducts');
  }

  /**
  * Tratamento de erro para 'getAllCategories'.
  */
  $scope.getAllCategories = function (cache) {
    categoryBO.getAllCategories(success_getAllCategories,error_getAllCategories,cache)
  }

  /**
  * Tratamento de erro para 'getAllCategories'.
  */
  function success_getAllCategories(r) {
    cacheAllCategories=r;
  }

  /**
  * Tratamento de erro para 'getAllCategories'.
  */
  function error_getAllCategories() {
    console.error('error_getAllCategories');
  }

  /**
  * Busca produto por nome
  */
  $scope.searchProductName = function () {
    productBO.searchProductName($scope.filterProduct,success_searchProductName,error_searchProductName)
  }

  /**
  * Tratamento de sucesso para 'searchProductName'
  */
  function success_searchProductName(r) {
    $scope.products=r;
  }

  /**
  * Tratamento de erro para 'searchProductName'
  */
  function error_searchProductName() {
    console.log('error_searchProductName');
  }

  $scope.searchProductCategoryName = function () {
    categoryBO.searchProductCategoryName($scope.filterCategory,success_searchProductCategoryName,error_searchProductCategoryName)
  }

  /**
  * Tratamento de sucesso para 'searchProductCategoryName'
  */
  function success_searchProductCategoryName(r) {
    $scope.products=r;
  }

  /**
  * Tratamento de erro para 'searchProductCategoryName'
  */
  function error_searchProductCategoryName() {
    console.log('error_searchProductCategoryName');
  }

  function init() {
    $scope.getAllProducts(true);
    $scope.getAllCategories(true);
  }

  init()
}
