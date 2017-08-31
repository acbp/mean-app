app.controller('productCtrl', productCtrl);

productCtrl.$inject =[ '$scope','API','$http','$uibModal','toaster'];

function productCtrl($scope,API,$http,$uibModal,toaster) {
  const productBO = new ProductBO( new ProductREP(API,$http) );
  const categoryBO = new CategoryBO( new CategoryREP(API,$http) );

  var cacheAllProducts; // guarda ultima lista de produtos
  var cacheAllCategories; // guarda ultima lista de categorias
  $scope.products;

  /**
  * Exibe produto em modal
  */
  $scope.viewProduct = function ( product ) {
    productBO.viewProduct( product )
  }

  /**
  * Edita produto
  */
  $scope.editProduct = function ( product ) {
    productBO.editProduct( product ,$scope.alerts.push  ,$scope.alerts.push )
  }

  /**
  * Tratamento de sucesso para 'deleteProduct'
  */
  function success_deleteProduct() {
    product.getAllProducts();
    toaster.success('Item editado','Atualizando lista.')
  }

  /**
  * Tratamento de erro para 'deleteProduct'
  */
  function error_deleteProduct() {
    toaster.success('Ocorreu um erro','Não foi possível editar.');
  }


  /**
  * Deletar após confirmação de modal
  */
  $scope.deleteProduct = function ( product ) {
    productBO.deleteProduct( product  , success_deleteProduct, error_deleteProduct )
  }

  /**
  * Tratamento de sucesso para 'deleteProduct'
  */
  function success_deleteProduct() {
    toaster.success('Item deletado')
  }

  /**
  * Tratamento de erro para 'deleteProduct'
  */
  function error_deleteProduct() {
    toaster.success('Ocorreu um erro','Não foi possível deletar');
  }

  /**
  * Pega todos os produtos
  */
  $scope.getAllProducts=function () {
    productBO.getAllProducts(success_getProducts,error_getProducts)
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
  $scope.getAllCategories = function () {
    categoryBO.getAllCategories(success_getAllCategories,error_getAllCategories)
  }

  /**
  * Tratamento de erro para 'getAllCategories'.
  */
  function success_getAllCategories(r) {
    productBO.cacheAllProducts=cacheAllCategories=r;
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
    productBO.searchProductCategoryName($scope.filterCategory,success_searchProductCategoryName,error_searchProductCategoryName)
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

    productBO.openModal = $uibModal.open
  }

  init()
}
