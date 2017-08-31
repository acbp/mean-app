var app = angular.module('app', ['ngRoute','ui.bootstrap','toaster', 'ngAnimate']);

app.constant('API',location.origin+'/api/')

// Definindo Rotas
app.config(function($routeProvider)
{
   $routeProvider
    .when("/", {
      templateUrl : 'src/domain/products/product.html'
    })

    .when("/category", {
      templateUrl : 'src/domain/categories/category.html'
    })
    .otherwise({redirectTo: '/'});
});
