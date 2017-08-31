app.controller('modalProductSaveCtrl', function ($scope,$uibModalInstance,config) {
  $scope.title=config.title;
  $scope.edit=config.edit;
  $scope.product=config.product;
  $scope.deletarImagem=config.deletarImagem;
  $scope.salvar=config.salvar;
  $scope.fechar = $uibModalInstance.dismiss
});
