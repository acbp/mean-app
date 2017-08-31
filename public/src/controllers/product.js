

app.controller('productCtrl', productCtrl);

productCtrl.$inject =[ '$scope','$http'];

function productCtrl($scope,$http) {
  $scope.products;

  /**
  * Pega todos os produtos
  */
  function getAllProducts() {
    $http.get('/api/products').then( success_getProducts, error_getProducts )
  }

  /**
  * Tratamento de sucesso para 'getAllProducts'.
  */
  function success_getProducts(r) {
    // mapeia elementos
    $scope.products=r.data.map(function (e) {
      // adiciona origem as fotos
      e.pictures.map(function (ee) {
        ee.src=location.origin+ee.src;
        return ee;
      })
      return e;
    })
  }

  /**
  * Tratamento de erro para 'getAllProducts'.
  */
  function error_getProducts(r) {

  }

  /**
  * Tratamento de erro para 'getAllProducts'.
  */
  function getAllCategories() {
    $http.get('/api/categories').then( success_getAllCategories, error_getAllCategories )
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

  }

  function init() {
    getAllProducts();
    getAllCategories();

  }

  init()
}
