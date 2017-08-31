var app = angular.module('app', ['ngRoute']);

// Definindo Rotas
app.config(function($routeProvider)
{
   $routeProvider
    .when("/", {
      templateUrl : 'src/view/product.html',
      controller     : 'productCtrl',
    })

    .when("/category", {
      templateUrl : 'src/view/category.html',
      controller     : 'categoryCtrl',
    })
    .otherwise({redirectTo: '/'});
});
