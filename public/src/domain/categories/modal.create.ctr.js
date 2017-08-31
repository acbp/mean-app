app.controller('modalCategorySaveCtrl', function ($scope,$uibModalInstance,config) {
  $scope.title=config.title;
  $scope.edit=config.edit;
  $scope.category=config.category;
  $scope.deletarImagem=config.deletarImagem;
  $scope.salvar=config.salvar;
  $scope.fechar = $uibModalInstance.dismiss
}
);
