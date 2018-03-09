
// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope, $http)
    {
        $scope.clothList = new Array();
        $scope.getClothes = function ()
        {
            var clothesEntered = document.getElementById("txt_clothes").value;

            if (clothesEntered != "") {

                $http({url:"http://localhost:8081/api/" + clothesEntered, method: 'POST'}).then(function(data, status){
                    $scope.venue = data.data.title;
                    alert(data.data.title);
                });
            }
        }
    });