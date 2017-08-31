var app = angular.module('app', ['ngRoute']);

app.constant('API',location.origin+'/api/')

// Definindo Rotas
app.config(function($routeProvider)
{
   $routeProvider
    .when("/", {
      templateUrl : 'src/view/product.html'
    })

    .when("/category", {
      templateUrl : 'src/view/category.html'
    })
    .otherwise({redirectTo: '/'});
});
