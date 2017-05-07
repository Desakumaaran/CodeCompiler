var app = angular.module("NodeApp", ["ngRoute", "ngStorage"]);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/login.html"
    })
    .when("/codeform/:UserID", {
        templateUrl : "views/Codeform.html"
    })
    ;
});