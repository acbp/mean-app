app.controller('productCtrl', productCtrl);

productCtrl.$inject =[ '$scope','API','$http','$uibModal','toaster'];

function productCtrl($scope,API,$http,$uibModal,toaster) {
  const productBO = new ProductBO( new ProductREP(API,$http) );
  const categoryBO = new CategoryBO( new CategoryREP(API,$http) );

  $scope.products;

    /**
    * Cria produto em modal
    */
    $scope.create = function ( product ) {
      productBO.create( product, toaster, success_create, error_create )
    }

    function success_create() {
      $scope.getAllProducts();
      toaster.success("Criado produto")
    }
    /**
    * Tratamento de erro para 'create'
    */
    function error_create() {
      toaster.error("Erro ao criado produto")
    }

    /**
    * Edita produto
    */
    $scope.edit = function ( product ) {
      productBO.edit( product,toaster,success_edit,error_edit )
    }

    /**
    * Tratamento de sucesso para 'edit'
    */
    function success_edit() {
      $scope.getAllProducts();
      toaster.success('Atualizando lista.')
    }

    /**
    * Tratamento de erro para 'edit'
    */
    function error_edit() {
      toaster.error('Ocorreu um erro','Não foi possível editar.');
    }

  /**
  * Exibe produto em modal
  */
  $scope.view = function ( product ) {
    productBO.view( product )
  }

  /**
  * Edita produto
  */
  $scope.edit = function ( product ) {
    productBO.edit( product )
  }

  /**
  * Tratamento de sucesso para 'editProduct'
  */
  function success_editProduct() {
    $scope.getAllProducts();
    toaster.success('Item editado','Atualizando lista.')
  }

  /**
  * Tratamento de erro para 'editProduct'
  */
  function error_editProduct() {
    toaster.error('Ocorreu um erro','Não foi possível editar.');
  }


  /**
  * Deletar após confirmação de modal
  */
  $scope.delete = function ( product ) {
    productBO.delete( product  , success_deleteProduct, error_deleteProduct )
  }

  /**
  * Tratamento de sucesso para 'deleteProduct'
  */
  function success_deleteProduct() {
    $scope.getAllProducts()
    toaster.success('Item deletado')
  }

  /**
  * Tratamento de erro para 'deleteProduct'
  */
  function error_deleteProduct() {
    toaster.error('Ocorreu um erro','Não foi possível deletar');
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
    $scope.products=r;
  }

  /**
  * Tratamento de erro para 'getAllProducts'.
  */
  function error_getProducts(r) {
    // tratamento por status
      console.error('error_getProducts');
  }

  /**
  * Pega todas as categorias.
  */
  $scope.getAllCategories = function () {
    categoryBO.getAllCategories(success_getAllCategories,error_getAllCategories)
  }

  /**
  * Tratamento de erro para 'getAllCategories'.
  */
  function success_getAllCategories(r) {
    productBO.cacheAllCategories=r;
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
