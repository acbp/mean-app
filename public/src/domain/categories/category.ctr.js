app.controller('categoryCtrl', categoryCtrl);

categoryCtrl.$inject =[ '$scope','API','$http'];

function categoryCtrl($scope,API,$http) {
  const bo = new CategoryBO( new CategoryREP(API,$http) );
  var cacheAllCategories; // guarda ultima lista de categorias
  $scope.categories;

  /**
  * Pega todos os categorias
  */
  $scope.getAllCategories=function () {
    bo.getAllCategories(success_getCategories,error_getCategories)
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

  $scope.searchCategoryName = function () {
    bo.searchCategoryName($scope.filterCategory,success_searchCategoryName,error_searchCategoryName)
  }

  /**
  * Tratamento de sucesso para 'searchCategoryName'
  */
  function success_searchCategoryName(r) {
    $scope.categories=r;
  }

  /**
  * Tratamento de erro para 'searchCategoryName'
  */
  function error_searchCategoryName() {
    console.log('error_searchCategoryName');
  }

  function init() {
    $scope.getAllCategories();
  }

  init()
}
