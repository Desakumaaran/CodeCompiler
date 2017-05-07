//var app = angular.module('NodeApp',[]);
app.controller('codeformctrl',['$scope','$routeParams','$route', '$http','$sessionStorage','$window', function ($scope,$routeParams,$route, $http, $sessionStorage,$window,$localStorage) {
    
    debugger;
    $scope.showout=false;
    
//$scope.UserID=$route.UserID;
 $scope.UserID=$routeParams.UserID;
    $scope.UserName=$sessionStorage.UserDetails.FirstName;
    if($scope.UserID>0)
        {
            //$scope.Showpage=true;
        }else{
            //$scope.Showpage=false;
        }
    
     $scope.RunCode = function () {
         debugger;
        var data = {
            "language": $scope.language,
            "code": myCodeMirror.getValue(),
            "input": $scope.inputs,
            "UserID": $scope.UserID
        }
        $http.post('/code',data).
            success(function (data) {
            $scope.showout = true;
            $scope.output=data;
            
                console.log("posted successfully");
            }).error(function (data) {
                console.error("error in posting");
            })
     }
 
   
}]);