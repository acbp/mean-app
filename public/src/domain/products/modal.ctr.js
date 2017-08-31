app.controller('modalProductCtrl', modalProductCtrl);

function modalProductCtrl($scope,$uibModalInstance,product) {
  $scope.product=product;
  $scope.fechar = function () {
    $uibModalInstance.dismiss();
  };
}
