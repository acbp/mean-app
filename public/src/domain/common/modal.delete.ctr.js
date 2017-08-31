app.controller('modalDeleteCtrl', modalDeleteCtrl);

function modalDeleteCtrl($scope,$uibModalInstance) {
  $scope.cancelar = $uibModalInstance.dismiss.bind({},false);
  $scope.deletar = $uibModalInstance.close.bind({},true);
}
