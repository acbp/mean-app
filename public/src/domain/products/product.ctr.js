

app.controller('productCtrl', productCtrl);

productCtrl.$inject =[ '$scope','API','$http'];

function productCtrl($scope,API,$http) {
  const bo = new ProductBO( new ProductREP(API,$http) );
  var cacheAllProducts; // guarda ultima lista de produtos
  $scope.products;

  /**
  * Pega todos os produtos
  */
  $scope.getAllProducts=function () {
    bo.getAllProducts(success_getProducts,error_getProducts)
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
  * Tratamento de erro para 'getAllProducts'.
  */
  $scope.getAllCategories = function () {
    bo.getAllCategories(success_getAllCategories,error_getAllCategories)
  }

  /**
  * Tratamento de erro para 'getAllProducts'.
  */
  function success_getAllCategories(r) {

  }

  /**
  * Tratamento de erro para 'getAllProducts'.
  */
  function error_getAllCategories() {
    console.error('error_getAllCategories');
  }

  /**
  * Busca produto por nome
  */
  $scope.searchProductName = function () {
    bo.searchProductName($scope.filterProduct,success_searchProductName,error_searchProductName)
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
    bo.searchProductCategoryName($scope.filterCategory,success_searchProductCategoryName,error_searchProductCategoryName)
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
    $scope.getAllProducts();
    $scope.getAllCategories();
  }

  init()
}
