//var app = angular.module('NodeApp',[]);
app.controller('Homectrl',['$scope','$location', '$http','$sessionStorage','$window', function ($scope, $location, $http, $sessionStorage,$window,$localStorage) {
    $sessionStorage.UserDetails = [];
    debugger;
   $scope.Register = function () {
         debugger;
       
        
        var document = {
                        FirstName:$scope.FirstName,
                        LastName:$scope.LastName, 
                        Email:$scope.Email,
                        Password:$scope.Password
                       };
       
        $http.post('/register',document).
            success(function (data) {
                console.log("posted successfully");
            }).error(function (data) {
                console.error("error in posting");
            })
    }
    $scope.Login = function () {
         debugger;
       
        
        var document = {
                        Email:$scope.Email,
                        Password:$scope.Password
                       };
       
        $http.post('/login',document).
            success(function (data) {
            $sessionStorage.UserDetails=data;
            $location.path('/codeform/'+data._id);
            
            //$window.location.assign('/codeform/'+data._id);
            
            
                //console.log("posted successfully");
            }).error(function (data) {
                //console.error("error in posting");
            })
    }
 
   
}]);