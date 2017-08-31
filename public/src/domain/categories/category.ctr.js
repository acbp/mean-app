app.controller('categoryCtrl', categoryCtrl);

categoryCtrl.$inject =[ '$scope','API','$http','$uibModal','toaster'];

function categoryCtrl($scope,API,$http,$uibModal,toaster) {
  const bo = new CategoryBO( new CategoryREP(API,$http) );

  $scope.categories;

  /**
  * Cria categoria em modal
  */
  $scope.create = function ( category ) {
    bo.create( category, toaster, success_create, error_create )
  }

  function success_create() {
    $scope.getAllCategories();
    toaster.success("Criado categoria")
  }
  /**
  * Tratamento de erro para 'create'
  */
  function error_create() {
    toaster.error("Erro ao criado categoria")
  }

  /**
  * Edita categoria
  */
  $scope.edit = function ( category ) {
    bo.edit( category,toaster,success_edit,error_edit )
  }

  /**
  * Tratamento de sucesso para 'edit'
  */
  function success_edit() {
    $scope.getAllCategories();
    toaster.success('Item editado','Atualizando lista.')
  }

  /**
  * Tratamento de erro para 'edit'
  */
  function error_edit() {
    toaster.error('Ocorreu um erro','Não foi possível editar.');
  }

  /**
  * Exibe categoria em modal
  */
  $scope.view = function ( category ) {
    bo.view( category )
  }

  /**
  * Deletar após confirmação de modal
  */
  $scope.delete = function ( category ) {
    bo.delete( category , success_delete, error_delete )
  }

  /**
  * Tratamento de sucesso para 'delete'
  */
  function success_delete() {
    $scope.getAllCategories();
    toaster.success('Item deletado')
  }

  /**
  * Tratamento de erro para 'delete'
  */
  function error_delete() {
    toaster.error('Ocorreu um erro','Não foi possível deletar');
  }

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
    $scope.categories=r;
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
    bo.openModal = $uibModal.open;
  }

  init()
}
