app.controller('modalProductCtrl', modalProductCtrl);

function modalProductCtrl($scope,$uibModalInstance,product,categories) {
  $scope.product=product;
  $scope.categories=categories;
  $scope.fechar = function () {
    $uibModalInstance.dismiss();
  };
}
