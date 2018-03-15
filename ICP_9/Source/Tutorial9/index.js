/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);

myapp.controller('MongoRestController',function($scope,$http){
    $scope.searchData = function() {

        var mobile = document.getElementById("txt_mobile").value;
        console.log(mobile);

        if (mobile != "") {

            $http({url: "http://localhost:8081/register/" + mobile, method: 'POST'}).then(function (data, status) {
            });
        }
    }
});