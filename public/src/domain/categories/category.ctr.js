app.controller('categoryCtrl', categoryCtrl);

categoryCtrl.$inject =[ '$scope','API','$http'];

function categoryCtrl($scope,API,$http) {
  const bo = new CategoryBO( new CategoryREP(API,$http) );
  var cacheAllCategories; // guarda ultima lista de categorias
  $scope.categories;

  /**
  * Pega todos os categorias
  */
  $scope.getAllCategories=function (cache) {
    bo.getAllCategories(success_getCategories,error_getCategories,cache)
  }

  /**
  * Tratamento de sucesso para 'getAllCategories'.
  */
  function success_getCategories(r) {
    $scope.categories=cacheAllCategories=r;
  }

  /**
  * Tratamento de erro para 'getAllCategories'.
  */
  function error_getCategories(r) {
    // tratamento por status
    console.error('error_getCategories');
  }

  $scope.searchProductCategoryName = function () {
    bo.searchProductCategoryName($scope.filterCategory,success_searchProductCategoryName,error_searchProductCategoryName)
  }

  /**
  * Tratamento de sucesso para 'searchProductCategoryName'
  */
  function success_searchProductCategoryName(r) {
    $scope.categories=r;
  }

  /**
  * Tratamento de erro para 'searchProductCategoryName'
  */
  function error_searchProductCategoryName() {
    console.log('error_searchProductCategoryName');
  }

  function init() {
    $scope.getAllCategories(true);
  }

  init()
}
