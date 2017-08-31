app.controller('modalCategoryCtrl', modalCategoryCtrl);

function modalCategoryCtrl($scope,$uibModalInstance,category) {
  $scope.category=category
  $scope.fechar = $uibModalInstance.dismiss
}
